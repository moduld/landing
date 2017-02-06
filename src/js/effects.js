/**
 * Created by den on 11/17/16.
 */
document.addEventListener("DOMContentLoaded", headerReady);
function headerReady ()
{
    var hiddenInput = document.getElementById('header_hidden_input');
    hiddenInput.addEventListener('change', offScrool);

    function offScrool(event)
    {
        document.body.classList.contains('off_scrool') ? document.body.classList.remove('off_scrool') : document.body.classList.add('off_scrool')
    }

    var obj1 = {a:1, b:2};
    var obj2 = {f:2, r:3};
    var obj3 = {a:3, r:3};
    var obj4 = {f:4, t:8};
    var obj5 = {e:90, y:4};
    var obj6 = {r:90, o:76}

    var a = [obj1, obj2, obj4, obj6]
    var b = [obj1, obj2, obj3, obj4, obj5]

    // a = a.filter(function (el)
    // {
    //     if (b.indexOf(el) >= 0){
    //         b.splice(b.indexOf(el), 1);
    //         return false
    //     }
    //     return true;
    // });

    for (var i = b.length; i--; a.indexOf(b[i]) >= 0 && a.splice(a.indexOf(b[i]), 1) && b.splice(i, 1)){}

    console.log('a', a)
    console.log('b', b)


    document.getElementById('button').addEventListener('click', changeColor);

function changeColor()
{
    var block = document.getElementById('my_block');
    var text = block.querySelector('.buy_title');
    var color = hexToRgbA(window.getComputedStyle(block, null).getPropertyValue('background-color'));
    var counter = 0;
    setColor(color);
    setInterval(function ()
    {
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);

        if (counter){
            color = [r, g, b];
        }
        setColor(color);
        counter += 1;
    }, 1000);

    function hexToRgbA(color)
    {
        var c;
        if (/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i.test(color)){
            c = color.match(/\d+/g)
            c = c.map(function (dig)
            {
                 return Number(dig)
            })
        }

        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)){
            c= color.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');

        }
        return [(c>>16)&255, (c>>8)&255, c&255]
    }

    function setColor(result)
    {
        block.style.backgroundColor = 'rgb(' + result.join(',') + ')';
        var out = Math.round(((result[0] * 299) + (result[1] * 587) + (result[2] * 114)) /1000);
        if(out > 125) {
            text.style.color = '#000000';
        }else{
            text.style.color = '#ffffff';
        }
    }
}

    var swiper2 = new Swiper('.logotipes', {
        // pagination: '.swiper-pagination',
        slidesPerView: 6,
        // paginationClickable: true,
        freeMode: true,
        spaceBetween: 50,
        nextButton: '.button-next',
        prevButton: '.button-prev',
        breakpoints: {
            // when window width is <= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            1250: {
                slidesPerView: 5,
                spaceBetween: 20
            },
            1000: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 2
            }

        }
    });

    var swiper1 = new Swiper('.frazes', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true
        // spaceBetween: 30

    });

    var headerLinks = document.getElementById('header_links_list').querySelectorAll('.hover_links');
    var linkButtons = document.querySelectorAll('.chevrone_vertical');
        if (headerLinks){
            for(var i = headerLinks.length; i--; headerLinks[i].addEventListener('click', loop)){}
        }

        if (linkButtons){
            for(var j = linkButtons.length; j--; linkButtons[j].addEventListener('click', loop)){}
        }

        function loop(event)
        {
            event.preventDefault();
            var anchor = event.target.getAttribute('href').substring(1);
            var offset = document.getElementById(anchor);
            offset && window.scroll({ top: offset.offsetTop, left: 0, behavior: 'smooth' });
        }
}