// index.js — handles OS auto-detect and UI interactions


const releases = {
windows: { url: './downloads/MyBrowser-win-x64.exe', label: 'Windows x64 · 36 MB', version: '1.2.0', sha256: 'REPLACE_WITH_SHA256' },
portable: { url: './downloads/MyBrowser-portable.zip', label: 'Portable · 34 MB', version: '1.2.0', sha256: 'REPLACE_WITH_SHA256' },
linux: { url: './downloads/MyBrowser-linux-x64.tar.gz', label: 'Linux x64 · 38 MB', version: '1.2.0', sha256: 'REPLACE_WITH_SHA256' },
mac: { url: './downloads/MyBrowser-mac.dmg', label: 'macOS · 41 MB', version: '1.2.0', sha256: 'REPLACE_WITH_SHA256' }
}


function detectOS(){
const ua = navigator.userAgent || navigator.vendor || window.opera;
if (/windows nt/i.test(ua)) return 'windows';
if (/mac os x/i.test(ua) || /macintosh/i.test(ua)) return 'mac';
if (/linux/i.test(ua)) return 'linux';
if (/android/i.test(ua)) return 'android';
if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
return 'windows';
}


function chooseRelease(){
const os = detectOS();
if(os === 'windows') return releases.windows;
if(os === 'mac') return releases.mac;
if(os === 'linux') return releases.linux;
// fallback
return releases.portable;
}


function setupDownloads(){
const primary = document.getElementById('primaryDownload');
const primaryMeta = document.getElementById('primaryMeta');
const win = document.getElementById('downloadWin');
const portable = document.getElementById('downloadPortable');
const versionEl = document.getElementById('currentVersion');


const choice = chooseRelease();
primary.href = choice.url;
primaryMeta.textContent = choice.label;
versionEl.textContent = `v${choice.version}`;


// set secondary links
win.href = releases.windows.url;
portable.href = releases.portable.url;


// optional: track clicks (very small local analytics)
document.querySelectorAll('a[download]').forEach(a => {
a.addEventListener('click', e => {
console.log('download:', a.href);
});
});
}


function setupModal(){
const open = document.getElementById('openChangelog');
const modal = document.getElementById('modal');
const close = document.getElementById('closeModal');


open.addEventListener('click', e => { e.preventDefault(); modal.setAttribute('aria-hidden', 'false'); });
close.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.setAttribute('aria-hidden','true'); });
}


window.addEventListener('DOMContentLoaded', () => {
setupDownloads();
setupModal();
});
