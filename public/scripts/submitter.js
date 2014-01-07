$(function(){
	$('body').delegate('#submitEmail','click',function(e){
		e.preventDefault();
		var emailaddress = $('#emailaddress').val();
		$.ajax({
			method:'post',
			url:'/email',
			data:{email:emailaddress},
			success:function(){
				console.log('success');
			}
			})
		})
	$('#emailaddress').keyup(function(e){
		
		if(e.which == 13){
			e.preventDefault();
			var emailaddress = $('#emailaddress').val();
		$.ajax({
			method:'post',
			url:'/email',
			data:{email:emailaddress},
			success:function(){
				console.log('success');
			}
			})
		}
		
		})
})
