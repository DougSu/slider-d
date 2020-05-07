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
        if(that.arg.width != '' && !isNaN(that.arg.width)){
            that.img_width = that.arg.width
            console.log(that.img_width)
            that.box.style.width = `${that.arg.width}px`
            oimg.style.width = `${that.arg.width}px`
        }else{
            oimg.onload = function(){
                that.img_width = oimg.width
                that.box.style.width = `${oimg.width}px`
            }
        }
    }
        
    that.box.appendChild(that.pdiv)
    var last = that.pdiv.childNodes[0].cloneNode(true)
    that.pdiv.appendChild(last)
    that.pdiv.style.display = 'flex'
    that.box.style.overflow = 'hidden'
    that.pdiv.style.display = 'flex'
}



/*         */

function create_btn(that) {
    that.prev = document.createElement('span')
    that.next = document.createElement('span')
    that.prev.id = 'prev'
    that.next.id = 'next'
    that.pdiv.parentNode.appendChild(that.prev)
    that.pdiv.parentNode.appendChild(that.next)
}

/*         */


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
            }, that.arg.speed)
        }).then(() => {
            that.b = true
            clearInterval(that.timer3)
        })
    }
}

/*         */


function move(obj) {
    obj.i += 5
    if (obj.i < (obj.img_width * obj.index) + 10 || obj.i == obj.img_width) {
        obj.pdiv.style.marginLeft = -obj.i + "px"
    }
}

/*         */


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
            }, o.arg.speed)
        }).then(() => {
            o.b = true
            clearInterval(timer)
        })
    }
}

/*    */

function autoplay(that){
    if (that.arg.autoplay == true) {
        that.timer1 = setInterval(sliders, that.arg.interval, that)
        that.pdiv.parentNode.onmouseover = function () {
            clearInterval(that.timer1)
        }
        that.pdiv.parentNode.onmouseleave = function () {
            that.timer1 = setInterval(sliders, that.arg.interval, that)
        }
    }
}
class Slider {
    constructor(arg,box) {
        var that = this
        this.box = box
        this.arg = arg
        this.b = true
        this.box = box
        this.img_width
        this.img_count = this.arg.img.length - 1
        this.i = 0
        this.index = 0
        create_dom(that)
        autoplay(that)
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