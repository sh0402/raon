var headerOpen = false,
	document_w = $(window).width();
	document_h = $(window).height();
$(document).ready(function(){
	// header 고정
	if ( $(".subCon").hasClass("headerfix") ){
		$(".header_wrap").addClass("on active");
		$(".pc_layout .header dl img").each(function(){
			if ( $(this).attr("src").indexOf("_on") == -1 ){
				$(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
			}
		});
		$(".mo_layout > .header").addClass("on");
		$(".mo_layout > .header .headerBtn img").each(function(){
			if ( $(this).attr("src").indexOf("_on") == -1 ){
				$(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
			}
		});
	}

	// 탑버튼
	$(".topBtn").click(function(){
		if ( $("#mainCon").css("display") == "block" ){ // main만
			if ( $(window).width() > 1080 ){
				fullpage_api.moveTo(1);
			} else {
				$("html, body").stop().animate({scrollTop:0}, "fast");
			}
		} else {
			$("html, body").stop().animate({scrollTop:0}, "fast");
		}
	});

	// header_wrap hover
	$(".header_wrap").hover(function(e){
		$(this).addClass("on");
		$(this).find(".header dl img").each(function(){
			if ( $(this).attr("src").indexOf("_on") == -1 ){
				$(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
			}
		});
	}, function(){
		if ( !headerOpen && !$(".header_wrap").hasClass("active") ){
			$(this).removeClass("on");
			$(this).find(".header dl img").each(function(){
				$(this).attr("src", $(this).attr("src").replace("_on.png", ".png"));
			});
		}
	});

    // gnb hover
    $(".pc_layout .header > ul > li").hover(function(){
		headerOpen = true;
		$(".header_wrap .searchWrap").hide();
		$(".lang_select ul").hide();
		$(".pc_layout .header > ul > li").removeClass("on");
		$(".pc_layout .header .depth2").hide();
		if ( !$(".header_wrap").hasClass("active") ){
			$(".header_wrap").addClass("on");
		}
		pcHeaderOnOff("on");
		$(this).addClass("on");
		$(this).find(".depth2").stop().fadeIn("fast");
    }, function(e){
		var eTarget = e.target;
		$(this).removeClass("on");
		$(this).find(".depth2").hide();
		if ( !$(".header_wrap").hasClass("active") && $(this).find("> a").text() != $(eTarget).text() ){
			$(".header_wrap").removeClass("on");
			pcHeaderOnOff("off");
		}
		headerOpen = false;
	});

	// search icon click
	$(".header .search_icon").click(function(){
		if ( !$(this).hasClass("on") ){
			if ( $(window).width() > 1080 ){
				headerOpen = true;
				$(this).addClass("on");
				$(".lang_select ul").hide();
				$(".header_wrap .searchWrap").stop().slideDown("fast");
				if ( !$(".header_wrap").hasClass("active") ){
					$(".header_wrap").addClass("on");
				}
				pcHeaderOnOff("on");
			} else {
				$(".mo_layout .searchWrap").stop().slideDown("fast");
			}
		} else {
			headerOpen = false;
			$(this).removeClass("on");
			$(".header_wrap .searchWrap").stop().slideUp("fast");
		}
	});

	// search x click
	$(".searchWrap .search_x").click(function(){
		if ( $(window).width() > 1080 ){
			$(".header_wrap .searchWrap").stop().slideUp("fast", function(){
				if ( !$(".header_wrap").hasClass("active") ){
					$(".header_wrap").removeClass("on");
					pcHeaderOnOff("off");
				}
				headerOpen = false;
			});
		} else {
			$(".mo_layout .searchWrap").stop().slideUp("fast");
		}
	});

	// 언어선택 hover
	$(".header .lang_select").hover(function(){
		headerOpen = true;
		$(this).addClass("on");
		$(".header_wrap .searchWrap").hide();
		$(".lang_select ul").stop().slideDown("fast", function(){
			$(".header .lang_select img").attr("src", $(".header .lang_select img").attr("src").replace("_on.png", "_active.png"));
		});
		if ( !$(".header_wrap").hasClass("active") ){
			$(".header_wrap").addClass("on");
		}
		pcHeaderOnOff("on");
		// 통합검색창 닫기
		$(".search_icon").removeClass("on");
	}, function(e){
		var eTarget = e.target;
		$(this).removeClass("on");
		if ( !$(".header_wrap").hasClass("active") && $(this).parent().find("> img").attr("src") != $(eTarget).attr("src") ){
			$(".header_wrap").removeClass("on");
			$(".header .lang_select img").attr("src", $(".header .lang_select img").attr("src").replace("_active.png", ".png"));
			pcHeaderOnOff("off");
		} else {
			$(".header .lang_select img").attr("src", $(".header .lang_select img").attr("src").replace("_active.png", "_on.png"));
		}
		$(".lang_select ul").stop().slideUp("fast", function(){
			headerOpen = false;
		});
	});

	// footer 사이트맵
	$(".siteMap_btn").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).addClass("on");
			if ( $("#mainCon").css("display") == "block" ){ // main만
				fullpage_api.moveTo(4);
				$(this).next().stop().slideDown("fast", function(){
					var content_h = $(window).height() - 100,
						foot_h = $("#section5").outerHeight(),
						siteMap_max = content_h  - $(".siteMap_btn").outerHeight() - $(".footer").outerHeight();
					if ( foot_h > content_h ){
						$(this).css("maxHeight", siteMap_max);
					}
					fullpage_api.moveTo(5);
				});
			} else {
				$(this).next().stop().slideDown("fast", function(){
					$(this).css("maxHeight", "");
				});
			}
		} else {
			$(this).removeClass("on");
			if ( $("#mainCon").css("display") == "block" ){ // main만
				fullpage_api.moveTo(5);
				$(this).next().stop().slideUp("fast", function(){
					fullpage_api.moveTo(6);
					$(this).css("maxHeight", "");
				});
			} else {
				$(this).next().stop().slideUp("fast");
			}
		}
	});

	// select 커스텀 클릭
	$(".footer .selectBox").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).addClass("on");
			$(".selectBox ul").stop().slideDown("fast");
		} else {
			$(this).removeClass("on");
			$(".selectBox ul").stop().slideUp("fast");
		}
	});

	$(".moMenu_bottom .selectBox p").click(function(){
		if ( !$(this).hasClass("on") ){
			$(".selectBox p").removeClass("on");
			$(".selectBox ul").stop().slideUp("fast");
			$(this).addClass("on");
			$(this).next().stop().slideDown("fast");
		} else {
			$(this).removeClass("on");
			$(this).next().stop().slideUp("fast");
		}
	});

	// 모바일 menu 클릭
	$(".menuBtn").click(function(){
		$(".moMenu").stop().fadeIn("fast");
		$(".moMenu .moMenuCon").stop().animate({left:0}, "fast");
		$("html,  body").css({"overflowY":"hidden", "height":"100%"});
	});

	// 모바일 menu x클릭
	$(".moMenu_x").click(function(){
		$(".moMenu").stop().fadeOut("fast");
		$(".moMenu .moMenuCon").stop().animate({left:"-100%"}, "fast");
		$("html,  body").css({"overflowY":"", "height":""});
	});

	// 모바일 gnb 클릭
	$(".moMenuCon > ul > li p, .moMenuCon > ul > li > a").click(function(){
		if ( !$(this).hasClass("on") ){
			if ( $(this).attr("href") == "javascript:;" ){
				$(".moMenuCon > ul > li p").removeClass("on");
				$(".moMenuCon > ul > li > ul li ul").hide();
				$(".moMenuCon > ul > li > a").removeClass("on");
				$(".moMenuCon > ul > li > ul").stop().slideUp("fast");
			} else {
				$(".moMenuCon > ul > li p").removeClass("on");
				$(".moMenuCon > ul > li > ul li ul").stop().slideUp("fast");
			}

			$(this).addClass("on");
			$(this).next().stop().slideDown("fast");
		} else {
			$(this).next().stop().slideUp("fast", function(){
				$(this).prev().removeClass("on");
			});
		}
	});

	// 모바일 다운로드 목록 메뉴
	$(".board_tit p, .board_tit a").click(function(){
		if( $(window).width() <= 770 ){
			if($(".board_tit p").hasClass("on")){
				$(".board_tit p").removeClass("on");
				$(".board_tit ul").stop().slideUp("fast");
			} else {
				$(".board_tit p").addClass("on");
				$(".board_tit ul").stop().slideDown("fast");
			}
		}

		if($(this).is("a")){
			$(".board_tit a").removeClass("on");
			$(this).addClass("on");
		}

	});


	// 공유하기 버튼
	var boardViewTop_func = "";
	$(".shareWrap dd").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).addClass("on");
			$(this).prev().addClass("on");
			$(this).css({"border-color":"#ff8400"});
			if ( !$(this).parents(".shareWrap").hasClass("shareWrap02") ){
				$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off.png", "_on.png"));
			} else {
				clearTimeout(boardViewTop_func);
				$(this).parents(".board_view_top").addClass("on");
				if( $(this).hasClass("hover") || $(window).width() < 1080 ){
						$(this).find("img").attr("src", $(this).find("img").attr("src").replace("02_off.png", "_on.png"));
				}
			}
		} else {
			$(this).removeClass("on");
			$(this).css({"border-color":"#999999"});
			if ( !$(this).parents(".shareWrap").hasClass("shareWrap02") ){
				$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.png", "_off.png"));
			} else {
				if( !$(this).hasClass("hover") || $(window).width() < 1080 ){
					$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.png", "02_off.png"));
				}
				boardViewTop_func = setTimeout(function(){ $(".board_view_top").removeClass("on"); }, 200);
			}
			$(this).prev().removeClass("on");
		}
	});

	// 공유하기 버튼 hover
	$(".shareWrap img").hover(function(){
		if ( !$(this).parent().hasClass("on") && $(window).width() > 1080 ){
			if ( !$(this).parents(".shareWrap").hasClass("shareWrap02") ){
				$(this).attr("src", $(this).attr("src").replace("_off.png", "_on.png"));
			} else {
				$(this).attr("src", $(this).attr("src").replace("02_off.png", "_on.png"));
			}
			if( $(this).parent().prop("tagName") == "DD" ){
				$(this).parent().addClass("hover");
			}
		}
	}, function(){
		if ( !$(this).parent().hasClass("on") && $(window).width() > 1080 ){
			if ( !$(this).parents(".shareWrap").hasClass("shareWrap02") ){
				$(this).attr("src", $(this).attr("src").replace("_on.png", "_off.png"));
			} else {
				$(this).attr("src", $(this).attr("src").replace("_on.png", "02_off.png"));
			}
			if( $(this).parent().prop("tagName") == "DD" ){
				$(this).parent().removeClass("hover");
			}
		}
	});

	$(document).click(function(e){
		var $click_target = $(e.target);
		if ( $(".selectBox p").hasClass("on") && $click_target.parents().attr("class") != "selectBox" ){ // select 커스텀 외 다른거 클릭시
			$(".selectBox p").removeClass("on");
			$(".selectBox ul").stop().slideUp("fast");
		}

		if( $(".board_tit p").hasClass("on") && $click_target.parents().attr("class") != "board_tit"){
			$(".board_tit p").removeClass("on");
			$(".board_tit ul").stop().slideUp("fast");
		}

		if( $(".privacy_date ul").hasClass("on") && $click_target.closest("dd").attr("class") != "privacy_date"){
			$(".privacy_date ul").removeClass("on");
			$(".privacy_date ul").stop().slideUp("fast");
		}

		if( $(".smallTab  .mSelect > p").hasClass("on") && $click_target.parents().attr("class") != "mSelect"){
			$(".smallTab  .mSelect > p").removeClass("on");
			$(".smallTab  .mSelect ul").stop().slideUp("fast");
		}

		if( $(".downSelect span").hasClass("on") && $click_target.parents().attr("class") != "downSelect"){
			$(".downSelect span").removeClass("on");
			$(".downSelect .downFlie_select").stop().slideUp("fast");
		}
	});

	// 제품 탐색기 선택 초기화 click
	$(".selectReset").click(function(){
		$("input[type='checkbox']").prop("checked", false);
		//get_prod_result();
	});

	// 제품 탐색기 키워드 input 클릭
	$(document).on("click", ".prodSelect [type='checkbox']", function(){
		if ( $(".prodSelect [type='checkbox']:checked").length == 6 ){
			alert("키워드는 최대 5개까지만 선택 가능합니다.");
			return false;
		}
	});

	// 제품 탐색기 모바일 키워드 선택 버튼 click
	$(".keywordSelect").click(function(){
		$("html ,body").css("overflowY", "hidden");
		$(".prodSelect dl dd").stop().fadeIn("fast", function(){
			var popH = $(".prodSelect .keyword_pop").outerHeight(),
				popTopBottom_h = $(".prodSelect .keywordPop_top").outerHeight() + $(".prodSelect .btn_wrap").outerHeight();
			$(".keyword_pop ul").css("maxHeight", popH - popTopBottom_h+"px");
		});
	});

	// 제품 탐색기 모바일 X버튼 click
	$(".keywordPop_top img").click(function(){
		$(".prodSelect dl dd").stop().fadeOut("fast", function(){
			$(".keyword_pop ul").css("maxHeight", "");
			$("html ,body").css("overflowY", "");
		});
	});

	// 개인정보 수집 및 이용 내용 팝업에서 최신내용 가져오기
	//$(".privacyCheck_wrap .privacyTxt").html( $(".privacy .privacy_txt:first").html() );
	$(".privacyCheck_wrap .privacyTxt").html( $("#privacy_inquery").html() );
	if ( document_w > 1080 ){
		$(".privacyCheck_wrap .privacyTxt > div").mCustomScrollbar({
			axis:"Y",
			theme:"minimal-dark"
		});
	}


	// 개인정보 처리방침 개정날짜 click
	$(".privacy_date span").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(".privacy_date ul").removeClass("on");
			$(".privacy_date ul").stop().slideUp("fast");
		} else{
			$(this).addClass("on");
			$(".privacy_date ul").addClass("on");
			$(".privacy_date ul").stop().slideDown("fast");
		}
	});
	
	// 개인정보 처리방침 개정날짜 리스트 클릭
	$(".privacy_date li").click(function(){
		if( !$(this).hasClass("on") ){
			$(".privacy_date li").removeClass("on");
			$(this).addClass("on");
			$(".privacy_date span").text( $(this).text() ).removeClass("on");
			$(this).parent().stop().slideUp("fast");
			$(".privacy_txt").hide();
			$(".privacy_txt").eq( $(this).index() ).show();
			$(".privacy_date ul").removeClass("on");
		} else {
			$(this).parent().stop().slideUp("fast");
			$(".privacy_date ul").removeClass("on");
			$(".privacy_date span").removeClass("on");
		}
	});
	
	// 개인정보 처리방침 확인 및 x 클릭
	$(".privacy_close, .privacy_btn").click(function(){
		$(".privacy").removeClass("on");
		$(".privacy_txt").css("height", "");
		if( $("#mainCon").css("display") != "block" ){ // 메인 아닐때
			$("body").css("overflow","");
		} else {
			$("body").off("scroll touchmove mousewheel");
		}
	});
	
	// footer 개인정보처리방침 클릭
	$(".privacy_open").click(function(){
		$(".privacy").addClass("on");
		privacyPop();
		if ( $(window).width() > 1080 ){
			$(".privacy .privacy_txt div").each(function(){
				$(this).mCustomScrollbar({
					axis:"Y",
					theme:"minimal-dark"
				});
			});
		} else {
			$(".privacy .privacy_txt div").each(function(){
				$(this).mCustomScrollbar("destroy");
			});
		}

		if( $("#mainCon").css("display") != "block" ){ // 메인 아닐때
			$("body").css("overflow","hidden");
		} else {
			$("body").on("scroll touchmove mousewheel", function(event) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			});
		}
	});

	// small 탭 클릭시
	$(".smallTab li").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).parent().find("li").removeClass("on");
			$(this).addClass("on");
			$(this).parent().prev().text( $(this).text() );
		}
		if ( $(this).parent().prev().css("display") == "block" ){ // 모바일에서 텍스트 넣어주기
			$(this).parent().prev().removeClass("on");
			$(this).parent().stop().slideUp("fast");
		}
	});
	// small 탭 모바일 클릭시
	$(".smallTab .mSelect > p").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).addClass("on");
			$(this).next().stop().slideDown("fast");
		} else {
			$(this).removeClass("on");
			$(this).next().stop().slideUp("fast");
		}
	});

	// 주주총회 지난결과 클릭시
	$(".last .share_info > dt").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).parents(".shareCon").find(".share_info > dt").removeClass("on");
			$(this).parents(".shareCon").find(".share_info > dd").stop().slideUp("fast");

			$(this).addClass("on");
			$(this).next().stop().slideDown("fast");
		} else {
			$(this).removeClass("on");
			$(this).next().stop().slideUp("fast");
		}
	});

	// 채용 FAQ 클릭시
	$(".last .recruit_info > dt").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).parents(".recruitCon").find(".recruit_info > dt").removeClass("on");
			$(this).parents(".recruitCon").find(".recruit_info").removeClass("on");
			$(this).parents(".recruitCon").find(".recruit_info > dd").stop().slideUp("fast");

			$(this).addClass("on");
			$(this).parent("dl").addClass("on");
			$(this).next().stop().slideDown("fast");
		} else {
			$(this).removeClass("on");
			$(this).parent("dl").removeClass("on");
			$(this).next().stop().slideUp("fast");
		}
	});

	// 서비스 문의 신청
	$(".prodContactCon h3").click(function(){
		if ( !$(this).hasClass("on") ){
			$(this).addClass("on");
			$(this).next().stop().slideDown("fast");
		} else {
			$(this).removeClass("on");
			$(this).next().stop().slideUp("fast");
		}
	});

	// 큰탭 스크롤
	if ( document_w > 770 ){
		$(".centerScrollTab ul").mCustomScrollbar({
			axis:"x",
			theme:"minimal-dark",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	}
	
	// 큰탭 load됐을때 on걸린 탭으로 위치이동
	if ( $(".centerScrollTab").css("display") == "block" ){
		var tabOn_left = $(".centerScrollTab ul li.on").offset().left - Number($(".centerScrollTab ul").css("paddingLeft").replace("px", ""));
		if ( document_w > 770 ){
			$(".centerScrollTab ul").mCustomScrollbar("scrollTo",tabOn_left);
		} else {
			$(".centerScrollTab ul").stop().animate({scrollLeft: tabOn_left}, "slow");
		}
	}

	// 장애문의 - 파일다운
	$(".disabilityTop ul li a").each(function(){
		if ( $(this).data("file") != undefined ){
			if ( document_w > 1080 ){
				$(this).attr("href", $(this).data("file"));
			} else {
				$(this).attr("href", "javascript:alert('PC에서만 다운로드가 가능합니다.');");
			}
		}
	});
	
	// 장애문의 - window클릭
	$(".downSelect span").click(function(){
		if ( $(window).width() > 1080 ){
			if ( !$(this).hasClass("on") ){
				$(this).addClass("on");
				$(this).next().stop().slideDown("fast");
			} else {
				$(this).removeClass("on");
				$(this).next().stop().slideUp("fast");
			}
		} else {
			alert("PC에서만 다운로드가 가능합니다.");
		}
	});

	// CI BI - 파일다운
	$(".cibiGuide03 dd .btn a").each(function(){
		if ( $(this).data("file") != undefined && !$(this).hasClass("imgDown") ){
			if ( document_w > 1080 ){
				$(this).attr("href", $(this).data("file"));
			} else {
				$(this).attr("href", "javascript:alert('PC에서만 다운로드가 가능합니다.');");
			}
		}
	});

	if( document_w > 770 ){
		requirementH();
	} else{
		$(".refer_requirement ul li").each(function(){
			$(this).css({"width": "50%"});
		});
	}

	// ? 플로팅 제품문의 팝업
	$(".bottomBtn .inquiryBtn").click(function(){
		if ( !$(this).hasClass("recruitBtn") ){
			$(".mCSB_container").show();
			$(".contactPopWrap .btn_wrap").show();
			$(".prodContactPop").stop().fadeIn("fast");
			prodContactPop();
			if ( $(window).width() > 1080 ){
				$(".prodContactPop .contactPopCon").mCustomScrollbar({
					axis:"Y",
					theme:"minimal-dark"
				});
			} else {
				$(".prodContactPop .contactPopCon").mCustomScrollbar("destroy");
			}

			if( $("#mainCon").css("display") != "block" ){ // 메인 아닐때
				$("body").css("overflow","hidden");
			} else {
				$("body").on("scroll touchmove mousewheel", function(event) {
					event.preventDefault();
					event.stopPropagation();
					return false;
				});
			}
		}
	});

	// ? 플로팅 x버튼 클릭
	$(".contactPop_x").click(function(){
		
		$(".prodContactPop .mCSB_container").hide(); //20211103 .prodContactPop 안에 .mCSB_container 만 적용되도록 수정
		$(".contactPopWrap .btn_wrap").hide();
		$(".prodContactPop").stop().fadeOut("fast");
		$(".prodContactPop .contactPopCon").css("height", "");
		if( $("#mainCon").css("display") != "block" ){ // 메인 아닐때
			$("body").css("overflow","");
		} else {
			$("body").off("scroll touchmove mousewheel");
		}
	});
});

$(window).resize(function(){
	// resize시 열려있던 popup 및 해당 style reset
	if (  $(window).width() != document_w ){
		$(".moMenu .moMenuCon").css("left", "-100%");
		$(".moMenu").hide();
		$(".privacy_date").removeClass("on");
		$(".privacy_date").children("ul").hide();
	}
	$(".siteMap").css("maxHeight", "").hide();
	$(".siteMap_btn").removeClass("on");
	if( $("#mainCon").css("display") != "block" ){ // 메인 아닐때
		$("body").css("overflow","");
		$("html ,body").css("overflowY", "");
	} else {
		$("body").off("scroll touchmove mousewheel");
	}
	if ( $(window).width() <= 770 ){
		$(".keyword_pop ul").css("maxHeight", "");
		$(".prodSelect dl dd").hide();
		//requirementH();
	} else {
		$(".prodSelect dl dd").attr("style", "");
		$(".refer_requirement ul li").each(function(){
			$(this).css({"width": "50%"});
		});
	}
	$(".board_tit ul").attr("style", "");
	$(".smallTab  .mSelect ul").attr("style", "");
	$(".privacy").removeClass("on");
	$(".privacy_txt").css("height", "");

	if ( $(window).width() > 1080 ){
		$(".privacyCheck_wrap .privacyTxt > div").mCustomScrollbar({
			axis:"Y",
			theme:"minimal-dark"
		});
	} else {
		$(".privacyCheck_wrap .privacyTxt > div").mCustomScrollbar("destroy");
	}

	if ( $(window).width() > 1080 ){
		$(".prodContactPop .contactPopCon").mCustomScrollbar({
			axis:"Y",
			theme:"minimal-dark"
		});
	} else {
		$(".prodContactPop .contactPopCon").mCustomScrollbar("destroy");
	}
	prodContactPop();

	if ( $(window).width() > 770 ){
		$(".centerScrollTab ul").mCustomScrollbar({
			axis:"x",
			theme:"minimal-dark",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	} else {
		$(".centerScrollTab ul").mCustomScrollbar("destroy");
	}
	
	$(".disabilityTop ul li a").each(function(){
		if ( $(this).data("file") != undefined ){
			if ( $(window).width() > 1080 ){
				$(this).attr("href", $(this).data("file"));
			} else {
				$(this).attr("href", "javascript:alert('PC에서만 다운로드가 가능합니다.');");
			}
		}
	});

	$(".cibiGuide03 dd .btn a").each(function(){
		if ( $(this).data("file") != undefined && !$(this).hasClass("imgDown") ){
			if ( $(window).width() > 1080 ){
				$(this).attr("href", $(this).data("file"));
			} else {
				$(this).attr("href", "javascript:alert('PC에서만 다운로드가 가능합니다.');");
			}
		}
	});

	if(this.resizeTO){
		clearTimeout(this.resizeTO);
	}
	this.resizeTO = setTimeout(function(){
		$(this).trigger('resizeEnd');
	}, 0);
});

$(window).on('resizeEnd', function(){ // resize end
	if ( $(".footLogo_wrap").css("display") == "block" ){ // 제품쪽 로고 롤링
		footLogoSwiper.autoplay.stop();
		footLogoSwiper.autoplay.start();
	}
});

$(window).scroll(function(){
	if ( $(this).scrollTop() > 0 ){
		if ( !$(".subCon").hasClass("headerfix") ){
			$(".header_wrap").addClass("on active");
			$(".pc_layout .header dl img").each(function(){
				if ( $(this).attr("src").indexOf("_on") == -1 ){
					$(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
				}
			});
			$(".topBtn").stop().fadeIn("fast");
			$(".topBtn").addClass("on");
			$(".mo_layout > .header").addClass("on");
			$(".mo_layout > .header .headerBtn img").each(function(){
				if ( $(this).attr("src").indexOf("_on") == -1 ){
					$(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
				}
			});
		}
	} else {
		if ( !$(".subCon").hasClass("headerfix") ){
			if ( headerOpen ){
				$(".header_wrap").removeClass("active");
			} else {
				$(".header_wrap").removeClass("on active");
			}
			$(".pc_layout .header dl img").each(function(){
				$(this).attr("src", $(this).attr("src").replace("_on.png", ".png"));
			});
			$(".topBtn").stop().fadeOut("600");
			$(".topBtn").removeClass("on")
			$(".mo_layout > .header").removeClass("on");
			$(".mo_layout > .header .headerBtn img").each(function(){
				$(this).attr("src", $(this).attr("src").replace("_on.png", ".png"));
			});
		}
	}
});

// pc header 열릴때
function pcHeaderOnOff(Switch){
	if ( Switch == "on" ){
		$(".header dl img").each(function(){
			if ( $(this).attr("src").indexOf("_on") == -1 ){
				$(this).attr("src", $(this).attr("src").replace(".png", "_on.png"));
			}
		});
	} else if ( Switch == "off" ){
		$(".header dl img").each(function(){
			if ( $(this).attr("src").indexOf("_on") > -1 ){
				$(this).attr("src", $(this).attr("src").replace("_on.png", ".png"));
			}
		});
	}
}

// privacyPop 높이값 구하기
function privacyPop(){
	$(".privacy").each(function(){ // main에서 팝업이 2개이므로...
		if ( $(this).css("display") == "block" ){
			$this = $(this);
			var privacyPop_h = $this.find("> dl").outerHeight(),
					privacyPop_padding = Number($this.find("> dl").css("paddingBottom").replace("px", ""));
					privacyPop_headerH = $this.find("> dl > dt").outerHeight() + Number($this.find("> dl > dt").css("marginBottom").replace("px", "")),
					privacyPop_bottomH = $this.find(".privacy_btn").outerHeight(),
					privacyPop_txtH = privacyPop_h - privacyPop_headerH - privacyPop_bottomH - privacyPop_padding;
			$this.find(".privacy_txt").css("height", privacyPop_txtH+"px");
		}
	});
}

// prodContactPop 높이값 구하기
function prodContactPop(){
	var $popCon = $(".prodContactPop"),
		popCon_h = $popCon.find(".contactPopWrap").outerHeight(),
		popCon_padding = Number($popCon.find(".contactPopWrap").css("paddingBottom").replace("px", ""));
		popCon_headerH = $popCon.find(".contactPopWrap h2").outerHeight() + Number($popCon.find(".contactPopWrap h2").css("marginBottom").replace("px", "")),
		popCon_bottomH = $popCon.find(".btn_wrap").outerHeight(),
		popCon_txtH = popCon_h - popCon_headerH - popCon_padding - popCon_bottomH;
	$popCon.find(".contactPopCon").css("height", popCon_txtH+"px");
}

// 레퍼런스 특화솔루션 요구사항 너비값 구하기
function requirementH(){
	var requirementCount = $(".refer_requirement ul li").length;
	$(".refer_requirement ul li").each(function(){
		$(this).css({"width": (1440 / $(".refer_requirement ul li").length) + "px"});
	});
}


// 제품문의 esc키 버튼으로 창 닫히기
$(document).on('keydown', function(){
	var keyCode = event.keyCode;
	if( keyCode == "27" ){
		$(".mCSB_container").hide();
		$(".contactPopWrap .btn_wrap").hide();
		$(".prodContactPop").stop().fadeOut("fast");
		$(".prodContactPop .contactPopCon").css("height", "");
		if( $("#mainCon").css("display") != "block" ){ // 메인 아닐때
			$("body").css("overflow","");
		} else {
			$("body").off("scroll touchmove mousewheel");
		}
	}
});