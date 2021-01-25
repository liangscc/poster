//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardInfo: {
      posterImage: "https://sf3-ttcdn-tos.pstatp.com/img/pgc-image/c7e1c68c02ed4eb9adba10db036abc94~cs_960x624.jpg", //需要https图片路径
      qrCode: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=327226293,686698084&fm=26&gp=0.jpg", //需要https图片路径
      // posterImage: "images/posterImage.png", //需要https图片路径
      // qrCode: "images/qrCode.png", //需要https图片路径
      // TagText: "小姐姐", //标签
      // Name: '小姐姐', //姓名
      Position: "程序员鼓励师", //职位
      Mobile: "13888888888", //手机
      Company: "才华无限有限公司", //公司


      // posterImage: '',
      qrCode: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F37%2F19%2F58573c403bcf4bf.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614172515&t=6bc3f9c6022e44d310627ba15f80eae7',
      posterBg: '',
      posterFooterBg: '',
      productName: '草本浓缩速溶茶饮（柠檬口味）',
      productDesc: '由本草植物提炼而成，令你活力满满的美味草本饮品',
      userName: 'Neil',
      avatar: '',
    }
  },

  onLoad: function () {
    this.getAvaterInfo();
    // wx.getUserInfo({
    //   success: res => {
    //     console.log(res.userInfo,"huoqudao le ")
    //     this.setData({
    //       name: res.userInfo.nickName,
    //     })
    //     wx.downloadFile({
    //       url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
    //       success: function (res) {
    //         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //         if (res.statusCode === 200) {
    //           console.log(res, "reererererer")
    //           that.setData({
    //             touxiang: res.tempFilePath
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 先下载头像图片
   */
  getAvaterInfo: function () {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardInfo.posterImage, //头像图片路径
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var avaterSrc = res.tempFilePath; //下载成功返回结果
          that.getQrCode(avaterSrc); //继续下载二维码图片
          // that.sharePosteCanvas(avaterSrc, '');
        } else {
          wx.showToast({
            title: '头像下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              var avaterSrc = "";
              that.getQrCode(avaterSrc);
            }
          })
        }
      }
    })
  },

  /**
   * 下载二维码图片
   */
  getQrCode: function (avaterSrc) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardInfo.qrCode, //二维码路径
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var codeSrc = res.tempFilePath;
          that.sharePosteCanvas(avaterSrc, codeSrc);
        } else {
          wx.showToast({
            title: '二维码下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              var codeSrc = "";
              that.sharePosteCanvas(avaterSrc, codeSrc);
            }
          })
        }
      }
    })
  },

  /**
   * 开始用canvas绘制分享海报
   * @param avaterSrc 下载的头像图片路径
   * @param codeSrc   下载的二维码图片路径
   */
  sharePosteCanvas: function (avaterSrc, codeSrc) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    })
    var that = this;
    var cardInfo = that.data.cardInfo; //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvas'); //创建画布
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
      console.log(rect);
      var top = rect.top - 12
      var left = rect.left + 8;
      var right = rect.right - 20;
      var width = rect.width - left * 2;
      var height = rect.height - top * 2;
      ctx.setFillStyle('rgba(0,0,0,0)');
      ctx.fillRect(0, 0, rect.width, height);

      // 画背景
      ctx.drawImage('/images/canvasBg.png', 0, 0, 351, 508)

      // 画Footer
      if ('/images/posterFooter.png') {
        var [x, y, w, h, r] = [left, top + height - 62 - 8, width, 62, 20, ]
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, 0);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, 0);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0)'; // 设置绘制圆形边框的颜色
        ctx.stroke();
        ctx.clip();
        ctx.drawImage('/images/posterFooter.png', x, y, w, h);
        ctx.restore();
      }

      // 画海报图片
      if (avaterSrc) {
        var [x, y, w, h, r] = [left, top, width, 240, 20, ]
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, 0);
        ctx.arcTo(x, y + h, x, y, 0);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0)'; // 设置绘制圆形边框的颜色
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(avaterSrc, x, y, w, h);
        ctx.restore();
      }

      // 画头像
      if (codeSrc) {
        var [x, y, r] = [left + 40, top + 240 + 170 + 12, 20]
        ctx.save();
        let d = r * 2;
        let cx = x + r;
        let cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0)'; // 设置绘制圆形边框的颜色
        ctx.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
        ctx.clip();
        ctx.drawImage(codeSrc, x, y, d, d);
        ctx.restore();
      }

      

      // 职位
      // if (cardInfo.Position) {
      //   ctx.setFontSize(12);
      //   ctx.setFillStyle('#666');
      //   ctx.setTextAlign('left');
      //   ctx.fillText(cardInfo.Position, left, width + 85);
      // }

      // 电话
      // if (cardInfo.Mobile) {
      //   ctx.setFontSize(12);
      //   ctx.setFillStyle('#666');
      //   ctx.setTextAlign('left');
      //   ctx.fillText(cardInfo.Mobile, left, width + 105);
      // }

      // 商品名称
      if (cardInfo.productName) {
        const fontSize = 20
        const CONTENT_ROW_LENGTH = parseInt(width / fontSize) * 2; // 正文 单行显示字符长度
        let [contentLeng, contentArray, contentRows] = that.textByteLength(cardInfo.productName, CONTENT_ROW_LENGTH);
        ctx.setTextAlign('left');
        ctx.setFillStyle('#000');
        ctx.setFontSize(fontSize);
        let contentHh = 22 * 1;
        for (let m = 0; m < contentArray.length; m++) {
          ctx.fillText(contentArray[m], left + 20, 240 + 50 + contentHh * m);
        }
      }

      // 商品描述
      if (cardInfo.productDesc) {
        const fontSize = 11
        const CONTENT_ROW_LENGTH = parseInt(width / fontSize) * 2 - 32; // 正文 单行显示字符长度
        let [contentLeng, contentArray, contentRows] = that.textByteLength(cardInfo.productDesc, CONTENT_ROW_LENGTH);
        ctx.setTextAlign('left');
        ctx.setFillStyle('#666');
        ctx.setFontSize(fontSize);
        let contentHh = 16 * 1;
        for (let m = 0; m < contentArray.length; m++) {
          ctx.fillText(contentArray[m], left + 20, top + 240 + 40 + 55 + contentHh * m);
        }
      }

      //  绘制二维码 
      if (codeSrc) {
        ctx.drawImage(codeSrc, left + 195, top + 240 + 65, 90, 90)
      }

      // 姓名
      if (cardInfo.userName) {
        console.log(cardInfo.userName);
        ctx.save();
        ctx.setFontSize(12);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
        ctx.fillText(`${cardInfo.userName} 向你推荐`, left + 90, top + 238 + 200 );
        ctx.fillText(`${cardInfo.productName}`, left + 90, top + 254 + 200 );
        ctx.restore()
      }

    }).exec()

    setTimeout(function () {
      ctx.draw();
      wx.hideLoading();
    }, 1000)

  },

  /**
   * 多行文字处理，每行显示数量
   * @param text 为传入的文本
   * @param num  为单行显示的字节长度
   */
  textByteLength(text, num) {
    let strLength = 0; // text byte length
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },

  //点击保存到相册
  saveShareImg: function () {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) {}
                },
                fail: function (res) {}
              })
            },
            fail: function (res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  },


})