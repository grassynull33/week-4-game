var characters = {
	abe: {
		name: "Abe",
		healthPoints: 10,
		attackPower: 10,
		counterAttackPower: 10,
		photo: "http://placehold.it/200?text=Abe",
	},

	ben: {
		name: "Ben",
		healthPoints: 30,
		attackPower: 10,
		counterAttackPower: 5,
		photo: "http://placehold.it/200?text=Ben",
	},

	carl: {
		name: "Carl",
		healthPoints: 18,
		attackPower: 10,
		counterAttackPower: 25,
		photo: "http://placehold.it/200?text=Carl",
	},

	david: {
		name: "David",
		healthPoints: 18,
		attackPower: 10,
		counterAttackPower: 8,
		photo: "http://placehold.it/200?text=David",
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
		characterPhoto.attr("src", value.photo);
		characterPhoto.addClass("character-photo");
		characterHealth.text(value.healthPoints);
		characterHealth.addClass("character-health");
		characterContainer.append(characterName);
		characterContainer.append(characterPhoto);
		characterContainer.append(characterHealth);
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

	$(document).on("click", ".character-container", function() {
		if(!characterSelected) {
			$(this).addClass("selected-character");
			characterSelected = true;
			$("#your-character").append($(".selected-character"));
			yourAttackDamage = $(".selected-character").attr("attack");
			yourAttackPower = $(".selected-character").attr("attack");

			//health of you and your opponent initilized and also your character name
			selectedCharacterHealth = $(".selected-character").attr("health");
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
			$(this).addClass("selected-defender");
			defenderSelected = true;
			$("#defender").append($(".selected-defender"));
			selectedDefenderName = $(".selected-defender").attr("id");
			defenderCounterAttack = $(".selected-defender").attr("counter");
			selectedDefenderHealth = $(".selected-defender").attr("health");
			$("#game-message").html("");
		}
	});

	$("#button-attack").on("click", function() {
		if($("#defender").text().length === 0) {
			$("#game-message").html("No enemy here!");
		} else {
			if(selectedDefenderHealth > 0 && selectedCharacterHealth > 0) {	//js tracking of defender's health
				selectedDefenderHealth = selectedDefenderHealth - yourAttackDamage;
				//html attr: new health value after your attack
				$(".selected-defender").attr("health", selectedDefenderHealth);
				//js tracking of your health
				//you only get dinged if your next blow does not kill
				
				if(selectedDefenderHealth - yourAttackDamage >= 0) {
					selectedCharacterHealth = selectedCharacterHealth - defenderCounterAttack;
				}
		
				// //html attr: new health value after your attack
				$(".selected-character").attr("health", selectedCharacterHealth);

				var nameArr = selectedDefenderName.split("");

				nameArr[0] = nameArr[0].toUpperCase();

				var defName = nameArr.join("");

				$("#game-message").html("You attacked " + defName + " for " + yourAttackDamage + " damage.<br>" + defName + " attacked you back for " + defenderCounterAttack + " damage.");

				//update HP
				$(".selected-defender > .character-health").text(selectedDefenderHealth);
				$(".selected-character > .character-health").text(selectedCharacterHealth);
				yourAttackDamage = parseInt(yourAttackDamage) + parseInt(yourAttackPower);
			} 

			if(selectedCharacterHealth <= 0) {
				$("#game-message").text("You have been defeated... GAME OVER!");
				$("#button-restart").css("display", "initial");
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
				$("#button-restart").css("display", "initial");
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
		characterSelected = false;
		defenderSelected = false;
		renderFromStart();
	});
});




