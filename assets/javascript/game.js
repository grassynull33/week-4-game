var characters = {
	walt: {
		name: "Walt",
		healthPoints: 110,
		attackPower: 10,
		counterAttackPower: 25,
		photo: "assets/images/walt.png"
	},

	skyler: {
		name: "Skyler",
		healthPoints: 100,
		attackPower: 9,
		counterAttackPower: 15,
		photo: "assets/images/skylar.png"
	},

	jesse: {
		name: "Jesse",
		healthPoints: 95,
		attackPower: 12,
		counterAttackPower: 12,
		photo: "assets/images/jesse.png"
	},

	gus: {
		name: "Gus",
		healthPoints: 120,
		attackPower: 8,
		counterAttackPower: 22,
		photo: "assets/images/gus.png"
	}
};

var characterSelected = false;
var defenderSelected = false;
var selectedCharacterName;
var selectedDefenderName;
var yourAttackDamage;
var yourAttackPower;
var defenderCounterAttack;
var selectedCharacterHealth;
var selectedDefenderHealth;

function renderFromStart() {
	// <div>
	// <span>name</span>
	// <img src=photo>
	// <span>healthPoints</span>
	// </div>
	$.each(characters, function(key, value) {
		var characterName = $("<span>");
		var characterPhoto = $("<img>");
		var characterHealth = $("<span>");
		var characterContainer = $("<div>");
		characterName.text(value.name);
		characterName.addClass("character-name");
		characterHealth.attr("max-health", value.healthPoints);
		characterHealth.text(value.healthPoints + "/" + characterHealth.attr("max-health"));
		characterHealth.addClass("character-health");
		characterPhoto.attr("src", value.photo);
		characterPhoto.addClass("character-photo");
		characterContainer.append(characterName);
		characterContainer.append(characterHealth);
		characterContainer.append(characterPhoto);
		$("#character-selection").append(characterContainer);
		characterContainer.addClass("character-container");
		characterContainer.attr("id", value.name.toLowerCase());

		//add stats
		characterContainer.attr("health", value.healthPoints);
		characterContainer.attr("attack", value.attackPower);
		characterContainer.attr("counter", value.counterAttackPower);
	});
}

$(document).ready(function() {
	renderFromStart();

	
	$("#character-header").css("display", "none");
	$("#enemies-header").css("display", "none");
	$("#fight-section-header").css("display", "none");
	$("#fight-section").css("display", "none");
	//$("#defender-header").css("display", "none");
	$("#button-attack").css("display", "none");

	$(document).on("click", ".character-container", function() {
		if(!characterSelected) {
			$("#selection-header").css("display", "none");
			$("#character-header").css("display", "block");
			$("#enemies-header").css("display", "block");
			$(this).addClass("selected-character");
			characterSelected = true;
			$("#your-character").append($(".selected-character"));
			yourAttackDamage = $(".selected-character").attr("attack");
			yourAttackPower = $(".selected-character").attr("attack");

			//health of you and your opponent initilized and also your character name
			selectedCharacterHealth = $(".selected-character").attr("health");
			//console.log(selectedCharacterHealth);
			selectedCharacterName = $(".selected-character").attr("id");
			//for loop where if characters are determined to not be user-selected, marked with an class "enemy-character" and also appended to the enemy section
			$.each(characters, function(key, value) {
				if(value.name.toLowerCase() !== selectedCharacterName) {
					$("#" + value.name.toLowerCase()).addClass("enemy-character");
				}
			});

			$("#your-enemies").append($(".enemy-character"));
		}
	});

	$(document).on("click", ".enemy-character", function() {
		if(!defenderSelected) {
			$("#fight-section-header").css("display", "block");
			$("#fight-section").css("display", "flex");
			$("#defender-header").css("display", "block");
			$(this).addClass("selected-defender");
			defenderSelected = true;
			$("#defender").append($(".selected-defender"));
			selectedDefenderName = $(".selected-defender").attr("id");
			defenderCounterAttack = $(".selected-defender").attr("counter");
			selectedDefenderHealth = $(".selected-defender").attr("health");
			$("#game-message").html("");
			$("#button-attack").css("display", "initial");
		}

		//console.log($("#your-enemies").text());
		if($("#your-enemies").text().length === 0) {
			$("#enemies-header").css("display", "none");
		}
	});

	$("#button-attack").on("click", function() {
		$("#game-message").css("display", "block");
		if($("#defender").text().length === 0) {
			$("#game-message").html("No enemy here!");
		} else {
			if(selectedDefenderHealth > 0 && selectedCharacterHealth > 0) {	//js tracking of defender's health
				selectedDefenderHealth = selectedDefenderHealth - yourAttackDamage;
				//html attr: new health value after your attack
				$(".selected-defender").attr("health", selectedDefenderHealth);
				//js tracking of your health
				//you only get dinged if your next blow does not kill
				
				if(selectedDefenderHealth >= 0) {
					selectedCharacterHealth = selectedCharacterHealth - defenderCounterAttack;
				}
				// console.log(selectedCharacterHealth);
				// console.log(selectedDefenderHealth);
				// console.log(yourAttackDamage);
				// //html attr: new health value after your attack
				$(".selected-character").attr("health", selectedCharacterHealth);

				var nameArr = selectedDefenderName.split("");

				nameArr[0] = nameArr[0].toUpperCase();

				var defName = nameArr.join("");

				$("#game-message").html("You attacked " + defName + " for " + yourAttackDamage + " damage.<br>" + defName + " attacked you back for " + defenderCounterAttack + " damage.");

				//update HP
				$(".selected-defender > .character-health").text(selectedDefenderHealth + "/" + $(".selected-defender > .character-health").attr("max-health"));
				$(".selected-character > .character-health").text(selectedCharacterHealth + "/" + $(".selected-character > .character-health").attr("max-health"));
				yourAttackDamage = parseInt(yourAttackDamage) + parseInt(yourAttackPower);
			} 

			if(selectedCharacterHealth <= 0) {
				$("#game-message").text("You have been defeated... GAME OVER!");
				$("#button-restart").css("display", "block");
				$("#button-attack").css("display", "none");
			} else if(selectedDefenderHealth <= 0) {
				var nameArr = selectedDefenderName.split("");

				nameArr[0] = nameArr[0].toUpperCase();

				var defName = nameArr.join("");

				$("#defender").empty();

				defenderSelected = false;

				$("#game-message").html("You have defeated " + defName + ". You can choose to fight another enemy!");
			}

			if($("#defender").text().length === 0 && $("#your-enemies").text().length === 0) {
				$("#game-message").html("You won!!! Game over!");
				$("#button-restart").css("display", "block");
				$("#button-attack").css("display", "none");
				$("#enemies-header").css("display", "none");
				//$("#defender-header").css("display", "none");
			}
		}
	});

	$("#button-restart").on("click", function() {
		$("#character-selection").html("");
		$("#your-character").html("");
		$("#your-enemies").html("");
		$("#defender").html("");
		$("#game-message").html("");
		$("#button-restart").css("display", "none");
		$("#game-message").css("display", "none");

		$("#selection-header").css("display", "block");
		$("#character-header").css("display", "none");
		$("#enemies-header").css("display", "none");
		$("#fight-section-header").css("display", "none");
		$("#fight-section").css("display", "none");
		$("#defender-header").css("display", "none");
		$("#button-attack").css("display", "none");
		characterSelected = false;
		defenderSelected = false;
		renderFromStart();
	});
});




