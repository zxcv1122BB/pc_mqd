// document.writeln("<div class=\'footer\'>");
// document.writeln("  <div class=\'wrap\'>");
// document.writeln("      <div class=\'foot-link clearfix\'>");
// document.writeln("          <div class=\'link-inner clearfix\'>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>购彩流程</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何注册</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何充值</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何领奖</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何提现</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>购彩指南</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>购彩流程</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>玩法介绍</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>常见问题</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>手机验证</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>撤单规则</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>提款须知</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>关於彩票网</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>企业简介</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>公司资质</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>法律声明</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>联繫我们</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("          </div>");
// document.writeln("          <div class=\'scan-code\'>");
// document.writeln("              <p id=\'qrcode2\'></p>");
// document.writeln("              <dt>扫码下载手机版</dt>");
// document.writeln("          </div>");
// document.writeln("      </div>");
// // document.writeln("      <div class=\'license\'>");
// // document.writeln("          <a href='javascript:void(0)' target='_blank'>");
// // document.writeln("              <img src='/static/images/foot1.png' />");
// // document.writeln("          </a>");
// // document.writeln("          <a href='javascript:void(0)' target='_blank'>");
// // document.writeln("              <img src='/static/images/foot2.png' />");
// // document.writeln("          </a>");
// // document.writeln("          <a href='javascript:void(0)' target='_blank'>");
// // document.writeln("              <img src='/static/images/foot3.png' />");
// // document.writeln("          </a>");
// // document.writeln("          <a href='javascript:void(0)' target='_blank'>");
// // document.writeln("              <img src='/static/images/foot4.png' />");
// // document.writeln("          </a>");
// // document.writeln("          <a href='javascript:void(0)' target='_blank'>");
// // document.writeln("              <img src='/static/images/foot5.png' />");
// // document.writeln("          </a>");
// // document.writeln("          <a href='javascript:void(0)' target='_blank'>");
// // document.writeln("              <div style='padding:4px;display: inline-block;border: 2px solid #999;'>");
// // document.writeln("                  <i></i>");
// // document.writeln("                  <span>电子营业执照</span>");
// // document.writeln("              </div>");
// // document.writeln("          </a>");
// // document.writeln("      </div>");
// document.writeln("  </div>");
// document.writeln("</div>");

document.writeln('<div class="footer"><div class="w-1200"><div class="bottom-nav fl"><div class="footer-nav"><a href="/help.html?0" class="">{{i18n.t("关于我们")}}</a><a href="/help.html?1" class="">{{i18n.t("联繫我们")}}</a><a href="/help.html?2" class="">{{i18n.t("常见问题")}}</a><a href="/help.html?3" class="">{{i18n.t("取款帮助")}}</a><a href="/help.html?4" class="">{{i18n.t("存款帮助")}}</a><a href="/help.html?5" class="">{{i18n.t("隐私保护规则")}}</a><a href="/help.html?6" class="">{{i18n.t("规则与条款")}}</a></div> <p>© 2011-2020 <strong class="platform">{{i18n.t("玛奇朵")}} {{i18n.t("彩票")}}</strong>{{i18n.t("版权所有")}}</p> <p><strong class="platform">{{i18n.t("玛奇朵")}} {{i18n.t("彩票")}}</strong>{{i18n.t("郑重提示")}}：{{i18n.t("彩票有风险")}}，{{i18n.t("投注需谨慎")}}，{{i18n.t("不向未满")}} 18 {{i18n.t("周岁的青少年出售彩票")}}</p></div> <div class="authorized fr"><div id="qrcode2"></div><p>{{i18n.t("扫码下载手机版")}}</p> </div></div></div>');


 var footer1 = new Vue({
     el:'.footer',
     data: {
        aaa:'nihao'
    },
 })


if (localStorage.config != undefined) {
    var obj = JSON.parse(localStorage.config);
    jQuery('#qrcode2').qrcode({
        render: "canvas", // 渲染方式有table方式和canvas方式
        width: 120, //默认宽度
        height: 120, //默认高度
        text: obj.appDownloadPageUrl, //二维码内容
        typeNumber: -1, //计算模式一般默认为-1
        correctLevel: 0, //二维码纠错级别
        background: "#ffffff", //背景颜色
        foreground: "#000000" //二维码颜色
    });
} else {
    var _obj = {
        type: "post",
        data: {},
        url: "/commonAPI/privacy/getSysConfigureResult",
        success: function success(data) {
            if (data.code == 200) {
                var config = data.body;
                jQuery('#qrcode2').qrcode({
                    render: "canvas", // 渲染方式有table方式和canvas方式
                    width: 120, //默认宽度
                    height: 120, //默认高度
                    text: config.appDownloadPageUrl, //二维码内容
                    typeNumber: -1, //计算模式一般默认为-1
                    correctLevel: 0, //二维码纠错级别
                    background: "#ffffff", //背景颜色
                    foreground: "#000000" //二维码颜色
                });
            }
        }
    };
    base.callCommonApi(_obj);
}