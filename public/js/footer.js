// document.writeln("<div class=\'footer\'>");
// document.writeln("  <div class=\'wrap\'>");
// document.writeln("      <div class=\'foot-link clearfix\'>");
// document.writeln("          <div class=\'link-inner clearfix\'>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>購彩流程</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何註冊</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何充值</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何領獎</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>如何提現</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>購彩指南</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>購彩流程</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>玩法介紹</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>常見問題</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>手機驗證</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>撤單規則</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>提款須知</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("              <dl>");
// document.writeln("                  <dt>關於彩票網</dt>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>企業簡介</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>公司資質</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>法律聲明</a>");
// document.writeln("                  </dd>");
// document.writeln("                  <dd>");
// document.writeln("                      <a href='javascript:void(0)' target='_blank'>聯繫我們</a>");
// document.writeln("                  </dd>");
// document.writeln("              </dl>");
// document.writeln("          </div>");
// document.writeln("          <div class=\'scan-code\'>");
// document.writeln("              <p id=\'qrcode2\'></p>");
// document.writeln("              <dt>掃碼下載手機版</dt>");
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
// // document.writeln("                  <span>電子營業執照</span>");
// // document.writeln("              </div>");
// // document.writeln("          </a>");
// // document.writeln("      </div>");
// document.writeln("  </div>");
// document.writeln("</div>");

document.writeln('<div class="footer"><div class="w-1200"><div class="bottom-nav fl"><div class="footer-nav"><a href="/help.html?0" class="">關於我們</a><a href="javascript:;" onclick="showLine()">聯繫我們</a><a href="/help.html?1" class="">取款幫助</a><a href="/help.html?2" class="">存款幫助</a><a href="/help.html?3" class="">常見問題</a></div> <p>© 2011-2020 <strong class="platform">SSG 彩票</strong>版權所有</p> <p><strong class="platform">SSG 彩票</strong>鄭重提示：彩票有風險，投注需謹慎，不向未滿 18 周歲的青少年出售彩票</p></div> <div class="authorized fr"><div id="qrcode2"></div><p>掃碼下載手機版</p> </div></div></div>');

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