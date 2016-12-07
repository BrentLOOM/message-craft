module.exports = {
	get: function(url, callback){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
				if (xmlhttp.status === 200) {
					callback(xmlhttp.responseText);
				}
				else if (xmlhttp.status === 400) {
					throw new Error('loadMsg.php: GET request returned error 400.');
				}
				else {
					throw new Error('loadMsg.php: GET request returned error.');
				}
			}
		};
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	},

	npc: function(callback){
		var url = './loadNPCs.php';
		this.get(url, callback);
	},

	msg: function(id, callback){
		var url = './loadMsg.php?id=' + id;
		this.get(url, callback);
	}
};