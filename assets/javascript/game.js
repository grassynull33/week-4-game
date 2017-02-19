var characters = {
	abe: {
		name: "Abe",
		healthPoints: 120,
		attackPower: 10,
		counterAttackPower: 10,
		photo: "http://placehold.it/200?text=Abe",
	},

	ben: {
		name: "Ben",
		healthPoints: 100,
		attackPower: 10,
		counterAttackPower: 10,
		photo: "http://placehold.it/200?text=Ben",
	},

	carl: {
		name: "Carl",
		healthPoints: 180,
		attackPower: 10,
		counterAttackPower: 10,
		photo: "http://placehold.it/200?text=Carl",
	},

	david: {
		name: "David",
		healthPoints: 180,
		attackPower: 10,
		counterAttackPower: 10,
		photo: "http://placehold.it/200?text=David",
	}
};

var characterSelected = false;

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
});

$(document).on("click", ".character-container", function() {
	if(!characterSelected) {
		var self = this;
		$(this).addClass("selected-character");
		characterSelected = true;
		$("#your-character").append($(".selected-character"));

		var selectedCharacterName = $(".selected-character").attr("id");
		//for loop where if characters are determined to not be user-selected, marked with an class "enemy-character" and also appended to the enemy section
		$.each(characters, function(key, value) {
			if(value.name.toLowerCase() !== selectedCharacterName) {
				$("#" + value.name.toLowerCase()).addClass("enemy-character");
			}
		});

		$("#your-enemies").append($(".enemy-character"));
	}
});





