function validar(){
	let nombre, edad, sexo, albúmina, fosfatasa, alanina, aspartato, bilirrubina, colinesterasa, creatinina, gamma, proteina, tabla, filaactual, nuevafila, celda1, celda2, celda3, celda4, celda5, celda6, celda7, celda8, celda9, celda10, celda11, celda12, celda13;
	let contador = 0;
	

	nombre = document.getElementById("nombre").value;
	edad = document.getElementById("edad").value;
	sexo = document.getElementById("sexo").value;
	albúmina = document.getElementById("albúmina").value;
	fosfatasa = document.getElementById("fosfatasa").value;
	alanina = document.getElementById("alanina").value;
	aspartato = document.getElementById("aspartato").value;
	bilirrubina = document.getElementById("bilirrubina").value;
	colinesterasa = document.getElementById("colinesterasa").value;
	creatinina = document.getElementById("creatinina").value;
	gamma = document.getElementById("gamma").value;
	proteina = document.getElementById("proteina").value;

	if(nombre == "" || edad == "" || sexo == "" || albúmina == "" || fosfatasa == "" || alanina == "" || aspartato == "" || bilirrubina == "" || colinesterasa == "" || creatinina == "" || gamma == "" || proteina == ""){
		alert("Uno o más campos no fueron diligenciados");
	}else{
		tabla = document.getElementById("tb");
		filaactual = document.getElementById("tb").rows.length;
		nuevafila = tabla.insertRow(filaactual);
		celda1 = nuevafila.insertCell(0);
		celda2 = nuevafila.insertCell(1);
		celda3 = nuevafila.insertCell(2);
		celda4 = nuevafila.insertCell(3);
		celda5 = nuevafila.insertCell(4);
		celda6 = nuevafila.insertCell(5);
		celda7 = nuevafila.insertCell(6);
		celda8 = nuevafila.insertCell(7);
		celda9 = nuevafila.insertCell(8);
		celda10 = nuevafila.insertCell(9);
		celda11 = nuevafila.insertCell(10);
		celda12 = nuevafila.insertCell(11);
		celda13 = nuevafila.insertCell(12);

		celda1.innerHTML = nombre;
		celda2.innerHTML = edad;
		celda3.innerHTML = sexo;
		celda4.innerHTML = albúmina;
		celda5.innerHTML = fosfatasa;
		celda6.innerHTML = alanina;
		celda7.innerHTML = aspartato;
		celda8.innerHTML = bilirrubina;
		celda9.innerHTML = colinesterasa;
		celda10.innerHTML = creatinina;
		celda11.innerHTML = gamma;
		celda12.innerHTML = proteina;
		celda13.innerHTML = '';
		
		document.getElementById("nombre").value = "";
		document.getElementById("edad").value = "";
		document.getElementById("sexo").value="";
		document.getElementById("albúmina").value = "";
		document.getElementById("fosfatasa").value = "";
		document.getElementById("alanina").value = "";
		document.getElementById("aspartato").value = "";
		document.getElementById("bilirrubina").value = "";
		document.getElementById("colinesterasa").value = "";
		document.getElementById("creatinina").value = "";
		document.getElementById("gamma").value = "";
		document.getElementById("proteina").value = "";

		if (albúmina > 54){
			contador++;
		}
		if (fosfatasa > 147){
			contador++;
		}
		if (alanina > 36){
			contador++;
		}
		if (aspartato > 36){
			contador++;
		}
		if (bilirrubina > 21){
			contador++;
		}
		if (colinesterasa > 18){
			contador++;
		}
		if (creatinina > 115){
			contador++;
		}
		if (gamma > 40){
			contador++;
		}
		if (proteina > 83){
			contador++;
		}

		Calcular(contador, celda13)
	}
}

const data = [albúmina, fosfatasa, alanina, aspartato, bilirrubina, colinesterasa, creatinina, gamma, proteina];

function calcularEntropia(data) {
	const total = data.length;
	const labels = {};

	for (let i = 0; i < total; i++) {
	const label = data[i][data[i].length - 1];
	if (!labels[label]) {
		labels[label] = 0;
	}
		labels[label]++;
	}

	let entropia = 0;
	for (let label in labels) {
	const probabilidad = labels[label] / total;
	  entropia -= probabilidad * Math.log2(probabilidad);
	}

	return entropia;
}

function dividirDatos(data, attributeIndex) {
	const dividedData = {};
	const total = data.length;

	for (let i = 0; i < total; i++) {
	const value = data[i][attributeIndex];
	if (!dividedData[value]) {
		dividedData[value] = [];
	}
	dividedData[value].push(data[i]);
	}

	return dividedData;
}


function calcularGanancia(data, attributeIndex) {
	const entropiaInicial = calcularEntropia(data);
	const dividedData = dividirDatos(data, attributeIndex);
	const total = data.length;
	let ganancia = entropiaInicial;


	for (let value in dividedData) {
	const subset = dividedData[value];
	const probabilidad = subset.length / total;
	ganancia -= probabilidad * calcularEntropia(subset);
	}

	return ganancia;
}

function seleccionarMejorAtributo(data) {
	const totalAtributos = data[0].length - 1;
	let mejorGanancia = 0;
	let mejorAtributo = 0;

	for (let i = 0; i < totalAtributos; i++) {
	const ganancia = calcularGanancia(data, i);
	if (ganancia > mejorGanancia) {
		mejorGanancia = ganancia;
		mejorAtributo = i;
	}
	}

	return mejorAtributo;
}


function construirArbol(data) {

	const clases = data.map((item) => item[item.length - 1]);
	if (new Set(clases).size === 1) {
	return clases[0];
	}

	if (data[0].length === 1) {
	const labels = {};
	for (let i = 0; i < data.length; i++) {
		const label = data[i][data[i].length - 1];
		if (!labels[label]) {
		labels[label] = 0;
		}
		labels[label]++;
	}
	let maxCount = 0;
	let maxLabel = '';
	for (let label in labels) {
		if (labels[label] > maxCount) {
		maxCount = labels[label];
		maxLabel = label;
		}
	}
	return maxLabel;
	}

	const mejorAtributo = seleccionarMejorAtributo(data);
	const arbol = {};
	arbol.atributo = mejorAtributo;

	const dividedData = dividirDatos(data, mejorAtributo);

	for (let value in dividedData) {
	arbol[value] = construirArbol(dividedData[value]);
	}

	return arbol;
}

function Calcular(contador, celda13){
		
		let resultado = ''

		if(contador < 3){
			resultado = "No Hay Probabilidad De Tener Hepatitis C";
			celda13.style.backgroundColor ="green";
		}
		if(contador >= 3 && contador <= 5){
			resultado = "Hay Probabilidad De Tener Hepatitis C";
			celda13.style.backgroundColor ="yellow";
		}
		if(contador > 5){
			resultado = "Positivo Para Hepatitis C";
			celda13.style.backgroundColor ="red";
		}
		celda13.innerHTML = resultado;
}
