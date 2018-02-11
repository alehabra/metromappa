//move mappa
window.onload = function(){
interact('.draggable')
  .ignoreFrom('input, textarea,.custom-checkbox')	
  .draggable({
    inertia: true,
    restrict: {
      restriction: 'parent',
      endOnly: true,
      elementRect: { top: 0.75, left:0.75 , bottom: 0.75, right: 0.25 }
    },
    autoScroll: true,
    onmove: dragMoveListener,
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });
  function dragMoveListener (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
  window.dragMoveListener = dragMoveListener;
};  
//Chiamata info metromappa
var Callmodule = (function(){
	$('#message').hide();
	$('#grazie').hide();
	var urljsonEntrata= "modello.json";
	function getmodules(){
		var req = $.ajax({
			url: urljsonEntrata,
			dataType: 'json',
			type: 'GET'
		});
		req.done(function(data){
			console.log('ajax to '+urljsonEntrata+' DONE');
			console.log(data);
			console.log('-----------------------------');
		});
		
		req.fail(function( jqXHR, textStatus, errorThrown ) {
			console.log('ajax to '+urljsonEntrata+' FAIL');
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			console.log('-----------------------------');
		});
		return req;
	}
	return {
		callGetmodules : getmodules(),
	}
})();

var modello = {};

var VueApp = (function(){
 //VUE JS
var Metromappa = new Vue({
  el: '#metromappa',
  data: {
	servizi_selezionati:[],
	il_tuo_percorso:[],
	i_prezzi:[],
	modello:modello,
	hamburgerActive: false,
	BottomGiallaDesc:false,
	giallaPicked:'',
	bluPicked:'',
	verdePicked:'',
	arancionePicked:'',
	violaPicked:'',
	sottoTemp:[],
	isLoading:true,
	hubactive:true,
	welcome:true,
	entrata:true,
	isDesktop:true,
	servizi_selezionati_desktop:[{lineaApparte:''}],
	evidenziare:{"blu":[],"verde":[],"gialla":[],"arancione":[],"viola":[]}
  },
  methods:{
	getModuleData : function(){				
		var req = Callmodule.callGetmodules;
		var self = this;
		req.done(function(data){
			self.modello=data;
			self.isLoading=false;
		});
		req.fail(function(jqXHR,textStatus,errorThrown){
			console.log('richiesta andata a male')
		});	
	},
	checkDevice : function(){
		var ua = navigator.userAgent;
		console.log(ua)

		if($(window).width()>768){
			this.isDesktop = true;
		}else{
			this.isDesktop = false;
		}
	},	
	removeEntrata: function(){
		this.entrata = false;
	},
	AggiungiaPercorso:function(){
		//Evidenziare i punti
		if(this.servizi_selezionati[0].lineaApparte == "blu"){
			var object = {};
			object['x'] = this.servizi_selezionati[0].x;
			object['y'] = this.servizi_selezionati[0].y;
			object['index'] = this.servizi_selezionati[0].index;
			this.evidenziare.blu.push(object);

			var uniqueArray = removeDuplicates(this.evidenziare.blu, "index");
			this.evidenziare.blu = uniqueArray;
		}
		if(this.servizi_selezionati[0].lineaApparte == "verde"){
			var object = {};
			object['x'] = this.servizi_selezionati[0].x;
			object['y'] = this.servizi_selezionati[0].y;
			object['index'] = this.servizi_selezionati[0].index;
			this.evidenziare.verde.push(object);

			var uniqueArray = removeDuplicates(this.evidenziare.verde, "index");
			this.evidenziare.verde = uniqueArray;
		}
		if(this.servizi_selezionati[0].lineaApparte == "arancione"){
			var object = {};
			object['x'] = this.servizi_selezionati[0].x;
			object['y'] = this.servizi_selezionati[0].y;
			object['index'] = this.servizi_selezionati[0].index;
			this.evidenziare.arancione.push(object);

			var uniqueArray = removeDuplicates(this.evidenziare.arancione, "index");
			this.evidenziare.arancione = uniqueArray;
		}				
		if(this.servizi_selezionati[0].lineaApparte == "gialla"){
			var object = {};
			object['x'] = this.servizi_selezionati[0].x;
			object['y'] = this.servizi_selezionati[0].y;
			object['index'] = this.servizi_selezionati[0].index;
			this.evidenziare.gialla.push(object);

			var uniqueArray = removeDuplicates(this.evidenziare.gialla, "index");
			this.evidenziare.gialla = uniqueArray;
		}
		if(this.servizi_selezionati[0].lineaApparte == "viola"){
			var object = {};
			object['x'] = this.servizi_selezionati[0].x;
			object['y'] = this.servizi_selezionati[0].y;
			object['index'] = this.servizi_selezionati[0].index;
			this.evidenziare.viola.push(object);

			var uniqueArray = removeDuplicates(this.evidenziare.viola, "index");
			this.evidenziare.viola = uniqueArray;
		}		
		function removeDuplicates(originalArray, prop) {
		     var newArray = [];
		     var lookupObject  = {};
		     for(var i in originalArray) {
		        lookupObject[originalArray[i][prop]] = originalArray[i];
		     }
		     for(i in lookupObject) {
		         newArray.push(lookupObject[i]);
		     }
		      return newArray;
		 }				
		//add il tuo percorso
		$.extend(this.servizi_selezionati[0], { "sottoservizio" : []});
		if(this.i_prezzi.length == 0){
			$.extend(this.servizi_selezionati[0], { "totale" :''});
		}					
		this.servizi_selezionati[0].sottoservizio = this.sottoTemp;		
		this.il_tuo_percorso.push(this.servizi_selezionati);
			//AGGIUNGERE PREZZO TOTALE
			for(var i = 0; i < this.sottoTemp.length; i++){
				this.i_prezzi.push(this.sottoTemp[i].sotprezzo)
			}
		var total = this.i_prezzi.reduce(function(total, num){ return total + num }  , 0);
		this.il_tuo_percorso[0][0].totale = total;

		this.servizi_selezionati = [];
		this.sottoTemp = [];
		this.BottomGiallaDesc = false;	
	},
	AddSotto: function(nome,prezzo){
		$.extend(this.servizi_selezionati[0], { "sottoservizio" : nome , "prezzo" : prezzo});
	},		
	attivaMenu : function(){
		if(this.hamburgerActive == false){
			var el = document.getElementById("ilPercorso");
			el.classList.remove("in");
			this.hamburgerActive = true;	
		}
		else{ this.hamburgerActive = false}
		return this.hamburgerActive;
	},
	attivaMenuDesk : function(color){
		this.servizi_selezionati_desktop[0].lineaApparte = color;
		if(color=='gialla'){
			$("#stGialla").addClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;																			
		}
		if(color=='arancione'){
			$("#stArancione").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;				
		}	
		if(color=='blu'){
			$("#stBlu").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;				
		}	
		if(color=='verde'){
			$("#stVerde").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;				
		}
		if(color=='viola'){
			$("#stViola").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			return;					
		} else {
			$("#stViola").removeClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			return;			
		}		
	},	
	mostraPercorso : function(){
		if(this.isDesktop == false){
			var el = document.getElementById("macroservizi");
			el.classList.remove("in");
			this.hamburgerActive = false;
		}
	},
	mostraPercorso2 : function(){
		var el = document.getElementById("ilPercorso");
		el.classList.remove("in");
		this.hamburgerActive = false;
	},
	mostraMappa : function(){
		var el = document.getElementById("ilPercorso");
		var el2 = document.getElementById("macroservizi");
		var el3 = document.getElementById("cerca");
		el.classList.remove("in");
		if(this.isDesktop==false){
		el2.classList.remove("in");
		}
		el3.classList.remove("in");
		this.hamburgerActive = false;
		this.servizi_selezionati.splice(0);
		this.BottomGiallaDesc = false;
	},
	hidereferemte : function(){
		$("#referente").collapse('hide');
	},
	pathlengthTozero : function(){
		this.il_tuo_percorso = [];
		this.i_prezzi = [];
		this.evidenziare.blu = [];
		this.evidenziare.gialla = [];
		this.evidenziare.verde = [];
		this.evidenziare.arancione = [];
		this.evidenziare.viola = [];
		this.mostraMappa();
	},
	mostraDescLungaGiallo : function(){
		if(this.BottomGiallaDesc ==false){
			this.BottomGiallaDesc = true
		} else 
		{ 
			this.BottomGiallaDesc = false; 
		}
	},
	mappaCenter : function({nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga}){
		var el2 = document.getElementById("macroservizi");
		var el3 = document.getElementById("cerca");
		if(this.isDesktop == false){
		el2.classList.remove("in");
		}
		el3.classList.remove("in");		
		this.hamburgerActive = false;

		//posizionamento della mappa al punto
		var totalWidth = $( document ).width();
		//var totalHeight = $( document ).width();
		var totalHeight = document.body.offsetHeight;

		if(this.isDesktop==false){
			var horizontalCenter = Math.floor(window.innerWidth);
			var verticalCener = Math.floor(window.innerHeight/2);
			var oriz = parseInt(`${x}`);
			var vert = parseInt(`${y}`);

			var oriz2 = 350 - oriz;
			var vert2 = 350 - vert;
			
			$('#map-container').addClass('transitions');
			$('#map-container').css({"transform":"translate("+oriz2+"px,"+vert2+"px)"})

			setTimeout(function(){
				$('#map-container').removeClass('transitions')
			},500);	
		} 
		/*
		if(this.isDesktop==false){
			var oriz = totalWidth/2;
			var oriz2 = oriz - `${x}`;
			var vert = totalHeight/2;
			var vert2 = parseInt(vert) - parseInt(`${y}`);			
			$('#map-container').addClass('transitions');
			$('#map-container').css({'left' : oriz2+'px'});
			$('#map-container').css({'top' : vert2+'px'});
			setTimeout(function(){
				$('#map-container').removeClass('transitions')
			},500);	
		} */

			//ATTIVARE LA SELEZIONE
			var nomeServizio = `${nomeServizio}`;
			var colore = `${classe}`;
			var index = `${index}`;
			var x = `${x}`;
			var y = `${y}`;
			//var selected = `${selected}`;
			var selected = true;
			var descrizione = `${descrizione}`;
			var descrizione_lunga = `${descrizione_lunga}`;
			//$("#"+colore+"-"+index+"").prop("checked", true);
			if(colore == "blu"){this.bluPicked = nomeServizio;};
			if(colore == "verde"){this.verdePicked = nomeServizio};
			if(colore == "gialla"){this.giallaPicked = nomeServizio};
			if(colore == "arancione"){this.arancionePicked = nomeServizio};
			if(colore == "viola"){this.violaPicked = nomeServizio};
				this.servizi_selezionati.splice(0);
				var temp = [{"lineaApparte":colore,"servizio":nomeServizio,"index":index,"descrizione":descrizione,"descrizione_lunga" : descrizione_lunga,"x":x,"y":y}]
				this.servizi_selezionati = temp;
				this.servizi_selezionati_desktop[0].lineaApparte = classe;
			return;	
	},
	AddServizi: function(selected,classe,nomeServizio,descriziones,descrizione_lungas,index,x,y){
		$("#sottoSelezionati").removeClass("in");
		this.servizi_selezionati.splice(0);
		if(selected==null){selected=false};
		if(!selected){
			this.servizi_selezionati.push({
				lineaApparte:classe,
				servizio:nomeServizio,
				descrizione : descriziones,
				descrizione_lunga : descrizione_lungas,
				index:index,
				x:x,
				y:y
			});
			this.servizi_selezionati_desktop[0].lineaApparte = classe;
		}
		if(classe=='gialla'){
			$("#stGialla").addClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			$("#gialla"+index).attr('checked','checked');
			this.giallaPicked = this.servizi_selezionati[0].servizio;
			this.arancionePicked = '';
			this.bluPicked = '';
			this.verdePicked = '';
			this.violaPicked = '';
			return;
		}
		if(classe=='arancione'){
			$("#stArancione").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			this.arancionePicked = this.servizi_selezionati[0].servizio;
			this.giallaPicked = '';
			this.bluPicked = '';
			this.verdePicked = '';
			this.violaPicked = '';
			return;						
		}	
		if(classe=='blu'){
			$("#stBlu").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			this.bluPicked = this.servizi_selezionati[0].servizio;
			this.arancionePicked = '';
			this.giallaPicked = '';
			this.verdePicked = '';
			this.violaPicked = '';
			return;						
		}	
		if(classe=='verde'){
			$("#stVerde").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			this.verdePicked = this.servizi_selezionati[0].servizio;
			this.arancionePicked = '';
			this.bluPicked = '';
			this.giallaPicked = '';
			this.violaPicked = '';
			return;						
		}
		if(classe=='viola'){
			$("#stViola").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			this.violaPicked = this.servizi_selezionati[0].servizio;
			this.arancionePicked = '';
			this.bluPicked = '';
			this.verdePicked = '';
			this.giallaPicked = '';
			return;							
		}		
	},	
	inebigger : function({propriety}){
		var toGrow = `${propriety}`
		if(toGrow=='gialla'){
			$("#stGialla").addClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');																	
		}
		if(toGrow=='arancione'){
			$("#stArancione").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;				
		}	
		if(toGrow=='blu'){
			$("#stBlu").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;				
		}	
		if(toGrow=='verde'){
			$("#stVerde").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stViola").removeClass('nodash');
			return;				
		}
		if(toGrow=='viola'){
			$("#stViola").addClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');
			return;					
		} if(toGrow==''){
			$("#stViola").removeClass('nodash');
			$("#stGialla").removeClass('nodash');
			$("#stArancione").removeClass('nodash');
			$("#stBlu").removeClass('nodash');
			$("#stVerde").removeClass('nodash');			
		}	
	},
	chiudimessage: function(){
		$('#message').hide();
	},
	chiudigrazie: function(){
		location.reload();
	},	
	mostramessage: function(){
		$('#message').show();
	},	
	evidenziaLineaDiversa : function({colore}){
		var colore = `${colore}`;
		this.servizi_selezionati_desktop[0].lineaApparte = colore;
	},	
	priceremove : function({prezzo}){
		var prezzo = `${prezzo}`;
		for(var i = 0; i < this.i_prezzi.length; i++){
			if(this.i_prezzi[i]==prezzo){
				this.i_prezzi.splice(i,1)
			}
		}		
	},
	poston : function(){
		if(this.hubactive){
			this.hubactive = false;	
		} else{
			this.hubactive = true;
		}
	},
	priceparentremove : function({prices,appartenenza,first_index}){
		var prices = `${prices}`;		
		//comparazione tra array I_price e quello ricevuto da parametro + cancellazione dati uguali su I_price
		for (var i = 0; i<prices.length; i++) {
			var arrlen = this.i_prezzi.length;
			for (var j = 0; j<arrlen; j++) {
				if (prices[i] == this.i_prezzi[j]) {
					this.i_prezzi = this.i_prezzi.slice(0, j).concat(this.i_prezzi.slice(j+1, arrlen));
				}
			}
		}
		//rimuovo da evidenziare l'oggetto corrispondente ad index
		var origIndex = `${first_index}`;
		var appartenenza = `${appartenenza}`;
		if(appartenenza == 'blu'){
			for(var i = 0; this.evidenziare.blu.length; i++){
				if(this.evidenziare.blu[i].index == origIndex){
					this.evidenziare.blu.splice(i);
					return;	
				}
			}		
		};
		if(appartenenza == 'verde'){
			for(var i = 0; this.evidenziare.verde.length; i++){
				if(this.evidenziare.verde[i].index == origIndex){
					this.evidenziare.verde.splice(i);
					return;	
				}
			}				
		};
		if(appartenenza == 'gialla'){
			for(var i = 0; this.evidenziare.gialla.length; i++){
				if(this.evidenziare.gialla[i].index == origIndex){
					this.evidenziare.gialla.splice(i);
					return;	
				}
			}				
		};
		if(appartenenza == 'arancione'){
			for(var i = 0; this.evidenziare.arancione.length; i++){
				if(this.evidenziare.arancione[i].index == origIndex){
					this.evidenziare.arancione.splice(i);
					return;	
				}
			}			
		};
		if(appartenenza == 'viola'){
			for(var i = 0; this.evidenziare.viola.length; i++){
				if(this.evidenziare.viola[i].index == origIndex){
					this.evidenziare.viola.splice(i);
					return;	
				}
			}			
		};
	},
	reload : function(){
		this.isLoading=false;		
		location.reload();
	},
	postaTutto : function(uscita){
		console.log("dati uscita "+ `${uscita}`);
		console.log(JSON.stringify(`${uscita}`));

		var exit = uscita;
		console.log(exit);
		this.isLoading=true;
		var config = {dataType: "jsonp"};
		
		const vm = this;

		axios.post(
				'php/main.php',
				uscita,
				config			
			)
		  .then(function (response) {
		  	var risposta = JSON.stringify(response.data);
		    console.log(risposta);
		    vm.isLoading=false;
		    vm.entrata=true;
		    /*
		    vm.evidenziare = {"blu":[],"verde":[],"gialla":[],"arancione":[],"viola":[]};
		    vm.servizi_selezionati_desktop=[{lineaApparte:''}];
			vm.giallaPicked='';
			vm.bluPicked='';
			vm.verdePicked='';
			vm.arancionePicked='';
			vm.violaPicked='';
			vm.sottoTemp=[];
			vm.servizi_selezionati=[];
			vm.il_tuo_percorso=[];
			vm.i_prezzi=[]; */
			$('#grazie').css('display', 'block');					    
		    $('#grazie').show();		
		    $('.info-grazie').html('Grazie!');
		    $('.text-grazie').html('La tua richiesta è stata inviata con successo! Una copia della tua richiesta è stata inviata al tuo indirizzo mail. Il nostro referente ti contatterà a breve al fine di ottenere maggiori informazioni e una quotazione personalizzata relativa ai servizi richiesti. Qualora non dovesse ricevere il nostro messaggio, ti suggerriamo di controllare la Posta indesiderata. Clicca sul pulsante sottostante per continuare la tua navigazione.');			    	    
		   	return;
		   //success();			
		  })
		  .catch(function (error) {
		    console.log(error);
		    vm.isLoading=false;
		    alert("qualcosa è andato storto, si prega di riprovare");
		    //wrong();
		    return;
		  });		
	}

  },
	beforeMount:function(){
		this.getModuleData();
		this.checkDevice();
	},
	computed: {
		listagialla() {
			return this.modello.lineaGialla;
		}
    }
})
	return VueApp;
})();