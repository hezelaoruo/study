//index.js
//获取应用实例
const db = wx.cloud.database();
const app = getApp()

Page({
  data: {
    cover: '',
    title: '',
    content: '',
    id:''
  },

  onLoad: function () {
    this.getBlogDetail();
  },

  /**
   * 获取文章详情
   */
  getBlogDetail() {
    // 初始化db
    //const db = wx.cloud.database({});
    let blogId = app.globalData.blog.id;
    db.collection('blog').doc(blogId).get().then(res => {
      console.log('db读取成功', res.data);
      let data = res.data;
      this.setData({
        cover: data.cover,
        title: data.title,
        content: data.content,
        id: data._id
      });
    })
      .catch(e => {
        wx.showToast({
          title: 'db读取失败',
          icon: 'none'
        });
      });
  },

  /**   
   * 预览图片  
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [this.data.cover] // 需要预览的图片http链接列表  
    });
  },
  update: function (event) {
    console.log(event)
    db.collection('blog').doc(this.data.id).update({
      data: {
        title: "局部更新测试2"
      },
      success: function (res) {
        console.log(res),
          wx.reLaunch({
            url: '../list/index'
          })
      }
    })
  },
  delete: function (event) {
    db.collection('blog').doc(this.data.id).remove({
      success: function (res) {
        console.log(res),
        wx.reLaunch({
          url: '../list/index'
        })
      }
    })
  }
})
