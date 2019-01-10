$(function () {
    // var AllPhotos = restirct.concat(photos);
    // $('#screen-slider .swiper-slide').each(function (index) {
    //     $(this).css('background-image', encodeURI('url(./src/photos/' + AllPhotos[index].path + ')'))
    // })
    // //mode0 轮播图
    // var swiper = new Swiper('.screen-slider', {
    //     loop : true,
    //     effect: 'coverflow',
    //     centeredSlides: true,
    //     slidesPerView: 'auto',
    //     coverflow: {
    //         rotate:30,// 旋转的角度
    //         stretch: 1000,// 拉伸   图片间左右的间距和密集度
    //         depth: 5000,// 深度   切换图片间上下的间距和密集度
    //         modifier: 30,// 修正值 该值越大前面的效果越明显
    //         slideShadows : false// 页面阴影效果
    //     }
    // });

	//点击开始抽奖
	$('#mode0 .contentCircle').on('click', function () {
		$('.main').hide();
		mode1();
	});

	$('#mode2 .button').on('click', function () {
		mode3();
	});

	//loading
	function mode1() {
		$('#mode1').show();
		setTimeout(function () {
			mode2();
		}, 5000)
	}

	//点击查看结果
	function mode2() {
		$('.main').hide();
		$('#mode2').show();
	}

	function mode3() {
		$('.main').hide();
		$('#mode3').show();

		//添加分组
		groups.forEach((item, index)=>{
			var html = '';

			item.group.forEach((man, manIndex)=>{
				var position = man.position || '';
				html += `<div class="photo-box">
                    <div class="photo-image" style="background-image: url('./src/photos/${man.path}'); ${position}" ></div>
                    <div>${man.name}</div>
                </div>`
			});

			$('#mode3 .swiper-slide').eq(index).html(`
			<div class="button group-button">${item.name}</div>
            <div class="photo">
                ${html}
            </div>
		`)
		});

		//分组结果

		var sixHtml = ''
		groups.forEach((item, index)=>{
			let innerHtml = '';

			item.group.forEach((man, manIndex)=>{
				if(manIndex === 0) {
					innerHtml += `${man.name}(组长)`
				} else {
					innerHtml += `，${man.name}`
				}
			});
			sixHtml += `<div><h2>
                            ${item.name}
                        </h2>
                        <div class="">
                            ${innerHtml}
                        </div></div>`
		});

		$('#result-inner').html(sixHtml);

		var mySwiper = new Swiper ('.swiper-container', {
			direction: 'horizontal', // 垂直切换选项

			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	/*
	* 分组函数
	* */

	let groups = [
		{
			name:'第一组',
			num: 10,
			group:[
                {"name": "Jack Liu", "path": "Jack Liu.jpg"},
				{"name": "Irene Guo","path": "Irene Guo.jpg"},
                {"name": "Ingrid Wong", "path": "Ingrid Wong.jpg"},
                {"name": "X H Li", "path": "X H Li.jpg"},{
                    "name": "Mengke Bateer",
                    "path": "Mengke Bateer.jpg"
                },{
                    "name": "Tessi Lu",
                    "path": "Tessi.JPG"
                },{
                    "name": "Sisley Zhang",
                    "path": "Sisley Zhang.jpg"
                }
            ]
		},
		{
			name:'第二组',
			num: 10,
			group:[]
		},
		{
			name:'第三组',
			num: 9,
			group:[]
		},
		{
			name:'第四组',
			num: 9,
			group:[]
		},
		{
			name:'第五组',
			num: 9,
			group:[]
		}
	]

	//添加
	const addGroup = function(groups, item){
		for(var i = 0; i<groups.length; i++) {
			if(groups[i].group.length === groups[i].num){
				continue;
			} else {
				groups[i].group.push(item);
				break;
			}
		}
	}

	//分组函数
	const splitGroup = function (arr, groupNumber) {
		//打乱随机排序
		var usedArr = arr.sort(function(){
			return Math.random() - 0.5;
		});

		let len = usedArr.length;

		for (let i = 0; i<len;i++) {
			addGroup(groups, usedArr[i]);
		}
	}

	splitGroup(photos);

});
