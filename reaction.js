// <b:if cond='data:view.isPost'><data:view.postId/><b:elseif cond='data:view.isPage'/><data:view.pageId/><b:else/></b:if>


// =================== reaction only post


var xhr = new XMLHttpRequest()
var key = nguyenduchoang
document.querySelectorAll("input").forEach(input => {
	input.addEventListener("click", () => {
		reaction(input.id)
		input.checked = false
		setTimeout(() => {
			input.checked = true
		}, 68);
	})
})
function innerRes(data) {
	for (d in data) {
		document.getElementById(`i${d}`).innerHTML = data[d]
	}
}
function reaction(id) {
	let i = id ? `&${id}=up` : ''
	xhr.open('GET', `https://hapi.ndh.io.vn?key=${key}${i}`, true)
	xhr.send()
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			innerRes(JSON.parse(xhr.responseText))
		} else if (xhr.readyState === 4 && xhr.status !== 200) {
			console.log("có lỗi");
		}
	};
}
window.addEventListener('DOMContentLoaded', () => {
	reaction()
})



// =================== reaction post and comment

var xhr = new XMLHttpRequest()
var key = nguyenduchoang

const aF = document.querySelector("#rL");
let hBA = false;

const observer = new IntersectionObserver(entries => {
  if (!hBA && entries[0].isIntersecting) {
    reaction()
    loadTim()
    hBA = true;
    observer.disconnect()
  }
})
observer.observe(aF)

document.querySelectorAll("input").forEach(input => {
	input.addEventListener("click", () => {
		reaction(input.id)
		input.checked = false
		setTimeout(() => {
			input.checked = true
		}, 68);
	})
})
function innerRes(data) {
	for (d in data) {
		document.getElementById(`i${d}`).innerHTML = data[d]
	}
}
function reaction(id) {
	let i = id ? `&${id}=up` : ''
	xhr.open('GET', `https://hapi.ndh.io.vn?key=${key}${i}`, false)
	xhr.send()
	innerRes(JSON.parse(xhr.responseText))
}

function loadTim() {
	document.querySelectorAll(".cmtTim").forEach(itag => {
		tim(itag.id)
	})
}
document.querySelectorAll(".cmtTim").forEach(itag => {
	itag.addEventListener("click", () => {
		let id = itag.id
		tim(id, '&action')
		itag.classList.add('cTA')
		localStorage.setItem(id, 'oke')
	});
});

function innerTim(id, data) {
	let itag = document.getElementById(id)
	itag.innerHTML = ` ${data['count']}`
	if (localStorage.getItem(id)) {
		itag.classList.add('cTA')
	}
}
function tim(id, v) {
	let vp = v || ''
	xhr.open('GET', `https://hapi.ndh.io.vn/tim.php?key=${id}${vp}`, false)
	xhr.send()
	innerTim(id, JSON.parse(xhr.responseText))
}
