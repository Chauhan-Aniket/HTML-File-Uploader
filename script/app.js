const firebaseConfig = {
	apiKey: "AIzaSyCJ8-tnKBhoMH-PDdoxw8aky7L1ka1cYCI",
	authDomain: "html-file-uploader.firebaseapp.com",
	databaseURL: "https://html-file-uploader.asia-south1.firebaseio.com",
	projectId: "html-file-uploader",
	storageBucket: "html-file-uploader.appspot.com",
	messagingSenderId: "146426081431",
	appId: "1:146426081431:web:c09c62c71a5a87f8d079d2",
	measurementId: "G-HRKXLZQC0E",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// timestamp
const timestamp = Math.round(new Date().getTime() / 1000);

const upload = document.querySelector(".upload-btn");
upload.addEventListener("click", (e) => uploadFile(e));

const uploadFile = (event) => {
	// get the reference
	const ref = firebase.storage().ref();
	event.preventDefault();

	// select files
	const file = document.querySelector("#fileAttachment").files[0];

	if (!file) {
		console.log("Select the file");
	}
	const name = `${file.name}_${timestamp}`;

	// metadata for file
	const metadata = {
		contentType: file.type,
	};

	// upload the image
	const task = ref.child(name).put(file, metadata);
	// it will return a promise
	// handle it by
	if (file.type === "text/html") {
		task
			.then((snapshot) => snapshot.ref.getDownloadURL())
			.then((url) => {
				document.getElementById("link").href = url;
				document.getElementById("link").innerText = url;
			});
	} else {
		console.log("Upload Only HTML File");
	}
};

const fileUrl = document.getElementById("fileAttachment");
const uploadUrl = document.getElementById("fileuploadurl");
const uploadBtn = document.querySelector(".upload-btn");
// local file name
fileUrl.onchange = ({ target: { value } }) => {
	uploadUrl.value = fileUrl.value.replace(/.*(\/|\\)/, "");

	uploadBtn.disabled = !value;
};
