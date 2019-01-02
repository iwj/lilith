// dependence
// <script src="./libgif.js"></script>
// <script src="./gifshot.min.js"></script>

// step 2, gif to images data set (use libgif.js))
var getImages = function (gifData, callback) {
  var images = []
  var originGif = document.getElementById('origin-gif')
  var hiddenDiv = document.getElementById('hiddenDiv')  
  var superGif = new SuperGif({gif: originGif})
  superGif.load(function () {
    // the superGif need a div to get the origin gif, 
    // and it will replaced the div to his own element,
    // so append the deleted div again.
    hiddenDiv.appendChild(originGif)
    for( var i = 0; i < superGif.get_length(); i++) {
      superGif.move_to(i + 1)
      var currentFrame = superGif.get_canvas().toDataURL()
      images.push(currentFrame)
    }
    addDialog(images, gifData, callback)
  })
}
// step 3, add text to the images which needed text
var addDialog = function (images, data, callback) {
  console.log('running addDialog')
  const size = data.size
  const dialogs = data.dialogs
  const endFlag = dialogs[dialogs.length - 1][0][1]
  for (let dialog of dialogs) {
    for (let i = dialog[0][0]; i <= dialog[0][1]; i++) {
      var canvas = document.createElement('canvas')
      canvas.width = size.width
      canvas.height = size.height
      const image = new Image()
      image.onload = function () {
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        ctx.lineWidth = 3
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.font = '20px sans-serif'
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = '#000'
        ctx.strokeText(dialog[1], Math.floor(size.width / 2), size.height - 10)
        ctx.fillText(dialog[1], Math.floor(size.width / 2), size.height - 10)
        images[i] = canvas.toDataURL()
        if (i === endFlag) {
          // console.log('最后一帧')
          callback(images)
        }
      }
      image.src = images[i]
    }
  }
  
}

// step 4, convert images set to gif (use Yahoo gifshot.js)
var imagesToGif = function (completedImages) {
  // console.log('开始转gif，帧数： ' + completedImages.length)
  gifshot.createGIF({
    'images': completedImages,
    'interval': 0.13,
    // 'frameDuration': 2,
    'gifWidth': 300,
    'gifHeight': 184,
    'sampleInterval': 5,
    'progressCallback': function(captureProgress){
      // console.log((captureProgress * 100 | 0) + '%')
    },
  }, function(obj) {
    if (!obj.error) {
      let imageResult = obj.image
      let show = new Image()
      show.src = imageResult
      let complete = document.getElementById('complete')
      complete.appendChild(show)
      complete.setAttribute('style', 'display: block;')
      console.log('生成完毕 ( •̀ ω •́ )y')
    } else {
      alert('抱歉，图像处理服务出错，请稍后再试。')
      console.log('铁子，调用 Yahoo gifshot 的模块出错了')
    }
  })
}

// step 1 get dialogs from user input
var make = function () {
  // get the keyword
  var dialogsDataFE = {}
  var keywordElement = document.getElementById('origin-gif')
  const keyword = keywordElement.getAttribute('keyword')
  switch (keyword) {
    case 'headman':
      dialogsDataFE.dialogs = [
        [[1, 14],],
        [[15, 30],],
        [[31, 37],],
        [[46, 55],],
        [[58, 72],],
      ]
      dialogsDataFE.size = {
        width: 300,
        height:186,
      }
      break;
    case 'wjz':
      dialogsDataFE.dialogs = [
        [[0, 8],],
        [[12, 23],],
        [[25, 34],],
        [[37, 47],],
      ]
      dialogsDataFE.size = {
        width: 300,
        height: 184,
      }
      break;
  }
  // get userinput dialogs
  var inputFather = document.getElementById('input-dialog')
  for (let i = 0; i < inputFather.children.length; i++) {
    dialogsDataFE.dialogs[i][1] = inputFather.children[i].value
  }
  // convert by the function getImages()
  getImages(dialogsDataFE, imagesToGif)
}