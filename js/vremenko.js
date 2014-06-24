$(document).ready(function() {

	var podaci,
		grad,
		url,
		temperatura,
		slika,
		pritisak;
	var inputPolje = $('#inp');

	inputPolje.focus();

	var latitude;
	var longitude;


	navigator.geolocation.getCurrentPosition(function(pozicija) {
        
            latitude = pozicija.coords.latitude;
			longitude = pozicija.coords.longitude;
			console.log(latitude + ", " + longitude);
            
            url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude 
            		+ "&lon=" + longitude;
            $.getJSON(url, function(podaci) {
				//za trenutnu geolokaciju
				if (podaci.cod != 404) {
					temperatura = parseInt(podaci.main.temp - 273.13);
					$('#temperatura').html(temperatura + "&deg" + "C");

					slika = "http://openweathermap.org/img/w/" + podaci.weather[0].icon+ ".png";
					$('#slika').css('background-image', 'url(' + slika + ')')
								.css('background-size', 'cover');
					pritisak = parseInt(podaci.main.pressure);
					$('#pritisak').text(pritisak + " mbar");

					inputPolje.val(podaci.name);
					console.log(grad);
				}
				else {
					//resetuje vrednosti, ako ne postoji grad/mesto
					$('#temperatura').html('#err');
					$('#slika').css('background-image', 'url("#")');
					$('#pritisak').text("");
					inputPolje.val("");
				};
			});
        });
	
	//kad korsnik klikne 'ok'
	$('#dugme').on('click', function() {
			grad = inputPolje.val();
			url = "http://api.openweathermap.org/data/2.5/weather?q=" + grad;
			$.getJSON(url, function(podaci) {
				//ako postoji taj grad
				if (podaci.cod != 404) {
					temperatura = parseInt(podaci.main.temp - 273.13);
					$('#temperatura').html(temperatura + "&deg" + "C");

					slika = "http://openweathermap.org/img/w/" + podaci.weather[0].icon+ ".png";
					$('#slika').css('background-image', 'url(' + slika + ')')
								.css('background-size', 'cover');
					pritisak = parseInt(podaci.main.pressure);
					$('#pritisak').text(pritisak + " mbar");
				}
				else {
					//resetuje vrednosti, ako ne postoji grad/mesto
					$('#temperatura').html('#err');
					$('#slika').css('background-image', 'url("#")');
					$('#pritisak').text("");
					inputPolje.val("");
				};
			});
	});


	//kad korisnik pritisne Enter u tekstualnom polju
	inputPolje.on('keypress', function(taster) {
		if (taster.which == 13) {
			grad = inputPolje.val();
			url = "http://api.openweathermap.org/data/2.5/weather?q=" + grad;
			$.getJSON(url, function(podaci) {
				//ako postoji taj grad
				if (podaci.cod != 404) {
					temperatura = parseInt(podaci.main.temp - 273.13);
					$('#temperatura').html(temperatura + "&deg" + "C");

					slika = "http://openweathermap.org/img/w/" + podaci.weather[0].icon+ ".png";
					$('#slika').css('background-image', 'url(' + slika + ')')
								.css('background-size', 'cover');
					pritisak = parseInt(podaci.main.pressure);
					$('#pritisak').text(pritisak + " mbar");
				}
				else {
					//resetuje vrednosti, ako ne postoji grad/mesto
					$('#temperatura').html('#err');
					$('#slika').css('background-image', 'url("#")');
					$('#pritisak').text("");
					inputPolje.val("");
				};
			});
		};
	});

	//kad korisnik klikne na tekst. polje, resetuje ga
	inputPolje.on('click', function() {
		$(this).val("");
	});
});