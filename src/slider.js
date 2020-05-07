function create_dom(that) {
    Slider.prototype.pdiv = document.createElement('div')
    that.pdiv.id = 'box'
    that.box.appendChild(that.pdiv)
    for (let i = 0; i < that.arg.img.length; i++) {
        var div = document.createElement('div')
        var oimg = document.createElement('img')
        oimg.src = that.arg.img[i]
        div.appendChild(oimg)
        that.pdiv.appendChild(div)   
    }
    
    var last = that.pdiv.childNodes[0].cloneNode(true)
    that.pdiv.appendChild(last)
    that.img_width = oimg.offsetWidth
    that.box.style.overflow = 'hidden'
    that.pdiv.style.display = 'flex'
}
function create_btn(that) {
    that.prev = document.createElement('span')
    that.next = document.createElement('span')
    that.prev.id = 'prev'
    that.next.id = 'next'
    that.pdiv.parentNode.appendChild(that.prev)
    that.pdiv.parentNode.appendChild(that.next)
}
function rev_move(that) {
    if (that.b) {
        that.b = false
        if (that.index == 0) {
            that.i = that.img_width * 4
            that.index = 4
            that.pdiv.style.marginLeft = -that.i + "px"
        }
        that.index -= 1
        new Promise((reslove, err) => {
            that.timer3 = setInterval(() => {
                that.i -= 10
                if (-that.i < -(that.img_width * (that.index) - 10)) {
                    that.pdiv.style.marginLeft = -that.i + "px"
                } else {
                    reslove()
                }
            }, 30)
        }).then(() => {
            that.b = true
            clearInterval(that.timer3)
        })
    }
}
function move(obj) {
    obj.i += 10
    if (obj.i < (obj.img_width * obj.index) + 10 || obj.i == obj.img_width) {
        obj.pdiv.style.marginLeft = -obj.i + "px"
    }
}
function sliders(o) {
    var timer
    if (o.b) {
        o.b = false
        if (o.index == 4) {
            o.i = 0
            o.index = 0
            o.pdiv.style.marginLeft = -o.i + "px"
        }
        o.index += 1
        new Promise((reslove, reject) => {
            timer = setInterval(() => {
                move(o)
                if (o.i > o.img_width * o.index) {
                    reslove()
                }
            }, 30)
        }).then(() => {
            o.b = true
            clearInterval(timer)
        })
    }
}
const Slider = function Slider(arg,box) {
        var that = this
        this.box = box
        this.arg = arg
        this.b = true
        this.img_width
        this.img_count = this.arg.img.length - 1
        this.i = 0
        this.index = 0
        create_dom(that)
        if (this.arg.autoplay != undefined && this.arg.btn == true) {
            this.timer1 = setInterval(sliders, 1000, this)
            this.pdiv.parentNode.onmouseover = function () {
                clearInterval(that.timer1)
            }
            this.pdiv.parentNode.onmouseleave = function () {
                that.timer1 = setInterval(sliders, 1000, that)
            }
        }
        if (this.arg.btn != undefined && this.arg.btn == true) {
            create_btn(that)
            this.prev.onclick = function () {
                sliders(that)
            }
            this.timer3 = ''
            this.next.onclick = function () {
                rev_move(that)
            }
        }
}
export default Slider