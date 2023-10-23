var html = document.body.textContent
let stringger = html.split('chat_sidebar_contact_rankings')[1].split('</script>')[0]
text = stringger.split('{"status":0')
let id = '', name = '', uniCode = ''
let ids = {}
for (let t of text) {
	if (t.includes('buddy_id')) {
		id = t.split('"buddy_id":"')[1].split('"')[0]
		uniCode = t.split('"name":"')[1].split('"')[0]
		name = JSON.parse('"' + uniCode + '"')
		ids[id] = name
	}
}
console.log(ids)



function sendMsg(uid, msg, name) {
	var xhr1 = new XMLHttpRequest()
	xhr1.open('GET', `https://m.facebook.com/messages/read/?fbid=${uid}`, true)
	xhr1.onreadystatechange = function () {
		if (xhr1.readyState === 4 && xhr1.status === 200) {
			let html = xhr1.responseText
			let tids = html.match(/tids=([^&]+)&amp;/)[1].replace('%3A', ':')
			let formAction = html.match(/action="([^"]+)"/)[1].replace(/&amp;/g, '&')
			let fb_dtsg = html.split('name="fb_dtsg" value="')[1]
			let jazoest = html.split('name="jazoest" value="')[1].split('"')[0]

			msg = msg.includes('<name>') ? msg.replace(/<name>/g, name) : msg

			let formData = new FormData()
			formData.append('tids', tids)
			formData.append('wwwupp', 'C3')
			formData.append(`ids[${uid}]`, uid)
			formData.append('platform_xmd', '')
			formData.append('body', msg)
			formData.append('waterfall_source', 'message')
			formData.append('action_time', Date.now())
			formData.append('fb_dtsg', fb_dtsg)
			formData.append('jazoest', Number(jazoest))
			let url = 'https://m.facebook.com' + formAction

			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', url, true)
			xhr2.send(formData)
			xhr2.onreadystatechange = function () {
				if (xhr2.readyState === 4 && xhr2.status === 200) {
					console.log(`[${uid}: ${name}] Thành công`)
				}
			}
		}
	}
	xhr1.send()
}

var msgList = [];
var inputVal;
var listUid = ''

do {
	inputVal = prompt('Nhập xong mỗi tin nhắn thì nhấn [ENTER] hoặc [Ok], tiếp tục..., kết thúc bằng cách nhấn nút [Cancel]\nNgoài ra có thể dùng <name> để gửi tin nhắn kèm tên của người nhận, ví dụ:\nXin chào <name> nhé')
	if (inputVal !== null) {
		msgList.push(inputVal)
	}
} while (inputVal !== null)

listUid = prompt('Nhập danh sách facebook uid:')
let delay = prompt('Nhập thời gian delay (khuyến nghị để ~> 1000)')
var listID = JSON.parse(listUid)

for (let i in listID) {
	let msg = msgList[Math.floor(Math.random() * msgList.length)]
	let uid = i
	let nL = listID[i].split(' ').length
	let name = listID[i].split(' ')[nL - 1]
	if (msg.length > 0) {
		setTimeout(() => {
			sendMsg(Number(uid), msg, name)
		}, Number(delay))
	}
}