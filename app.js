window.addEventListener('load', function() {
	var app = new PatternLockScreen({
		container: "lock-screen",
		width: 400,
		height: 400,
		onSuccess: function(){
			console.log('success');
		},
		onFailure: function(){
			console.log('failure');
		},
		pattern: '1-44-4-4-5-2-7-3-9-19-3-5-8-9-2-5-'
	});
	var unlockButton = document.getElementById('unlock-button');
	var savePatternButton = document.getElementById('save-pattern-button');
	var resetButton = document.getElementById('reset-button');
	var showHint = true;

	savePatternButton.addEventListener('click', function(){
		var span = this.getElementsByClassName('gray');
		if( span.className==='red' ){
			this.innerHTML = '<span class="gray"></span>Record Pattern';
			span.className = 'gray';
			app.stopRecordPattern();
			unlockButton.style.display = 'inline';
		}
		else {
			this.innerHTML = '<span class="red"></span>Recording...';
			span.className = 'red';
			app.startRecordPattern();
			unlockButton.style.display = 'none';
		}
	}, false);
	unlockButton.addEventListener('click', function(){
		var btn = this;
		if( !app.unlock() ){
			this.className = "button red";
			setTimeout(function(){
				btn.className = "button blue";
			}, 1000);
		}
		else {
			btn.className = "button green";
			alert('Access Granted!');
		}
	}, false);
	resetButton.addEventListener('click', function(){
		app.reset();
	});
	document.addEventListener('keyup', function(e){
		var code = e.keyCode || e.which;
		if( code === 72 ){		
			app.showHint(showHint);
			showHint = !showHint;
		}
	});
	
}, false);