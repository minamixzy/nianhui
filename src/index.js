$(function () {

	//点击开始抽奖
	$('#mode0 .button').on('click', function () {
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
				html += `<div class="photo-box">
                    <div class="photo-image" style="background-image: url('./src/photos/${man.path}')" ></div>
                    <div>${man.name}</div>
                </div>`
			});

			$('.swiper-slide').eq(index).html(`
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
			group:[]
		},
		{
			name:'第二组',
			num: 10,
			group:[]
		},
		{
			name:'第三组',
			num: 10,
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
