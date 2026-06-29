// This file contains Menu related logic and UI related logic for the game
import {item } from "./classes.js";
export function play_menu_music(){
	/** Plays music in the menus.

    Args:
        N/A

    Returns:
        N/a
	*/
	if (sessionStorage.getItem("audioReady")) {
		let audio = new Audio('../assets/music/menu_music.mp3')
		audio.loop = true;
		audio.volume = 1;
		audio.play();
		console.log("music playeing")
	}
}


export function inbetween_menu(username,unlocked_items,difficulty,starting_item){
	/** Displays the inbetween menu (the pre game menu that isnt the title screen)

    Args:
		username (str) : The players username
		unlocked_items (str*) : The unlocked items of the player

    Returns:
        Selected item (str)
		Difficulty (str)

	*/
	// Grab canvas and ctx to draw the menu on
	let canvas = document.getElementById("game_window")
	let ctx = canvas.getContext("2d")
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	let x = null;
	let y = null;
	let game_state_ = "menu"

	// Font styling 
	ctx.textAlign = "center";
	ctx.font = '40px "Jersey 10"';
	ctx.fillStyle = '#000000';
	ctx.textBaseline = 'middle';
	// Draw the character
	menu_character_draw(canvas.width / 2-(canvas.width * 0.25), canvas.height * 0.06, canvas.width * 0.4, canvas.height * 0.9, "../../main/assets/character/front.png", ctx)

	ctx.fillText(username, canvas.width *.45, canvas.height * 0.9);
	// Draw the button
	ctx.beginPath();
	// (x, y, width, height, radii)
	ctx.roundRect(canvas.width * 0.78, canvas.height * 0.85, canvas.width * 0.2, canvas.height * 0.1, canvas.width * 0.015);

	// Style the outline (no fill)
	ctx.strokeStyle = '#000000'; // Button border color
	ctx.lineWidth = 3;           // Border thickness
	ctx.stroke();

	// Add text to the button

	let random_saying = ["Send it →", "Good Luck! →", "Have Fun! →", "Don't Crash! →", "Ski Fast! →", "Last Lap, Best Lap →", "Ride the chair →", "Drop in →", "Ski you later!→"]
	ctx.fillText(random_saying[Math.floor(Math.random() * random_saying.length)], canvas.width * 0.78+(canvas.width * 0.2/2),canvas.height * 0.85+(canvas.height * 0.1/2));
	// Difficulty 
	ctx.fillText("Difficulty", canvas.width * 0.005 + ( canvas.width * 0.125/2),canvas.height*0.03)
	// Difficulty Selector
	let selecrted_difficulty = difficulty
	let difficulty_rects = []
	for (let i = 0; i < 3; i++) {		
		ctx.beginPath();
		// (x, y, width, height, radii)
		ctx.roundRect(canvas.width * 0.005, canvas.height * 0.08 + i * (canvas.height * 0.12), canvas.width * 0.125, canvas.height * 0.08, canvas.width * 0.005);
		difficulty_rects.push({ x: (canvas.width * 0.005), y: (canvas.height * 0.08 + i * (canvas.height * 0.12)), width: (canvas.width * 0.125), height: (canvas.height * 0.08) })
		if(i === 0){
			ctx.strokeStyle = '#2f9e44'
			if (selecrted_difficulty === "bluebird") {
				ctx.fillStyle = '#b2f2bb';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else if (i === 1){
			ctx.strokeStyle = '#1971c2'
			if (selecrted_difficulty === "flurry") {
				ctx.fillStyle = '#a5d8ff';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else if (i === 2){
			ctx.strokeStyle = '#000000';
			if (selecrted_difficulty === "whiteout") {
				ctx.fillStyle = '#868e96';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else{
			console.log("Error")
		}
		ctx.lineWidth = 3;
		ctx.stroke()		
		ctx.fill();
		ctx.closePath()
	}
	// CTX 
	// Reset text size

	let content = ""
	for (let i = 0; i < 3; i++) {
		if(i === 0){
			ctx.fillStyle = '#2f9e44'
			content = "Bluebird"
		}else if (i === 1){
			ctx.fillStyle = '#1971c2'
			content = "Flurry"
		}else if (i === 2){
			ctx.fillStyle = '#000000';
			content = "Blizzard"
		}
		//rectX+(rectWidth/2),rectY+(rectHeight/2)

		ctx.fillText(content,canvas.width * 0.005 + ( canvas.width * 0.125/2),canvas.height * 0.08 + i * (canvas.height * 0.12)+(canvas.height * 0.08/2))
	}
	
	// Draw items grid

	ctx.fillStyle = '#000000';
	// Items heading 
	ctx.fillText ("Starting Item Selection",canvas.width * 0.78+(canvas.width * 0.2/2),canvas.height*0.03)
	// Source links for sample grid images
	const image_urls = [
		"../assets/items/apple.png",
		"../assets/items/chocolate_bar.png",
		"../assets/items/coin.png",
		"../assets/items/cola.png",
		"../assets/items/medkit.png",
		"../assets/items/mini_snowman.png",
		"../assets/items/muffin.png",
		"../assets/items/pet_rock.png",
		"../assets/items/pizza.png",
		"../assets/items/goggles.png",
		"../assets/items/sandwich.png",
		"../assets/items/snowball.png",
	];
	const owned_items_url = image_urls.filter(url => unlocked_items.includes(url));
	while (owned_items_url.length < image_urls.length){
		owned_items_url.push("../assets/items/locked_item.png")
	}

	let item_grid = []
	owned_items_url.forEach((url, index) => {
		const img = new Image();

		let temp_item = {
			src: url,
			x: canvas.width * 0.76 + index % 3 * (canvas.width * 0.08),
			y: canvas.height * 0.12 + Math.floor(index / 3) * (canvas.height * 0.15),
			width: canvas.width * 0.06,
			height: canvas.height * 0.14
		};

		item_grid.push(temp_item)

		img.onload = () => {
			ctx.drawImage(img, temp_item.x, temp_item.y, temp_item.width, temp_item.height);

			if (starting_item === temp_item.src) {
				ctx.lineWidth = 5;
				ctx.strokeStyle = "#000000";
				ctx.strokeRect(temp_item.x - 2, temp_item.y - 2, temp_item.width + 4, temp_item.height + 4);
			}
		};

		img.src = url;
	});
	// Do corresponding click action
	if (window.last_click) {
    	const { x, y } = window.last_click;
		// For the item grid 
		for (let i = item_grid.length - 1; i >= 0; i--) {
			const item = item_grid[i];
			if (
				x >= item.x && x <= item.x + item.width &&
       			y >= item.y && y <= item.y + item.height
				)
		 	{
				console.log(`Clicked inside ${item.src}`);
				// Save item
				starting_item = item.src;
				break;
			
			}
		}
		
		// For the difficulty rectangles
		for (let i = 0; i < difficulty_rects.length; i++) {
			const rect = difficulty_rects[i];
			if (
				x >= rect.x && x <= rect.x + rect.width &&
				y >= rect.y && y <= rect.y + rect.height
			) {
				if (i === 0){
					selecrted_difficulty = "bluebird";	
				}else if (i === 1){
					selecrted_difficulty = "flurry"
				}else if (i === 2){
					selecrted_difficulty = "whiteout"
				}
				console.log(`Difficulty ${selecrted_difficulty}`);
			}
		}
		// X, y , width, height , radius
		// (canvas.width * 0.78, canvas.height * 0.85, canvas.width * 0.2,(canvas.height * 0.1, canvas.width * 0.015)
		// Start button
		if (
			x >= (canvas.width * 0.78) && x <= (canvas.width * 0.78) + (canvas.width * 0.2) &&
			y >= (canvas.height * 0.85) && y <= (canvas.height * 0.85) + (canvas.height * 0.1)
		) {
			console.log("next state")
			game_state_ = "game"
		}
	}
	window.last_click = null;
	return {
		difficulty: selecrted_difficulty,
		starting_item,
		game_state: game_state_
	};

}

function menu_character_draw(x,y,width,height,current_sprite_dir,ctx){
	const image = new Image();
	image.src = current_sprite_dir;
	image.addEventListener("load", (e) => {
		ctx.drawImage(image, x, y, width, height)
	});	
}

export function end_screen(score_,item_dict,obstacle_dodged){
	/** Displays the end screen after death (in the core game)

    Args:
		score (int) :  The final score of the player
		item_dict (dict) :  The items collected by the player
		obstacle_dodged (int) :  The number of obstacles dodged by the player

    Returns:
        N/A
	*/


	// Getting ctx and canvas to draw on
	const canvas = document.getElementById("game_window");
	let ctx = canvas.getContext("2d")

	ctx.globalAlpha =1;
	ctx.imageSmoothingEnabled = false;
	ctx.textAlign = "center";
	ctx.textBaseline = 'middle';

	// Title font
	ctx.font = "100px 'Jersey 10'";
	ctx.fillStyle = "#e03131";
	ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 20);
	// Regular font
	ctx.font = "60px 'Jersey 10'";
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = '#bbbbbb';
	ctx.lineWidth = 4;
	// Score, info + highscore Box 

	// Score Rounded box
	ctx.beginPath();
	// X, y , width , height, rounding
	ctx.roundRect(canvas.width * 0.5, canvas.height * 0.15, canvas.width * 0.49, canvas.height * 0.3, canvas.width * 0.015);
	ctx.stroke()
	ctx.closePath()

	ctx.fillStyle = "#000000";
	ctx.fillText("Stastics",canvas.width * 0.5+(canvas.width * 0.45/2),canvas.height * 0.2)

	//temp scores and stats
	let high_score_ = parseInt(sessionStorage.getItem("high_score")) || 0;
	let item_count = Object.keys(item_dict).length
	// Statistics
	ctx.font = "50px 'Jersey 10'";
	ctx.textAlign = "left";
	//+(canvas.width * 0.45/4)
	ctx.fillText(`Score: ${score_}`, canvas.width * 0.8, canvas.height * 0.35);
	ctx.fillText(`High Score: ${high_score_}`, canvas.width * 0.51, canvas.height * 0.35);
	ctx.fillText(`Obstacles Dodged: ${obstacle_dodged}`, canvas.width * 0.51, canvas.height * 0.25);
	ctx.fillText(`Items: ${item_count}`, canvas.width * 0.8, canvas.height * 0.25);	

	ctx.textAlign = "center";
	ctx.fillText("You've unlocked:",canvas.width * 0.69, canvas.height * 0.6)
	// Draw unlocked items
	for (let i = 0; i < Math.min(item_dict.length, 5); i++) {
		const item = item_dict[i];
		const icon = new Image();
		icon.src = item.fetch_icon();
		const x = canvas.width * 0.75 + i * ((canvas.width * 0.5) / 5);
		icon.onload = () => {
			ctx.drawImage(icon, x, (canvas.height * 0.63), (canvas.width * 0.04), (canvas.width * 0.04));
		};
	}
	
	// Red Round Rectangle button (Return to menu)
	ctx.strokeStyle = '#e03131';
	ctx.fillStyle = "#e03131";
	ctx.beginPath();

	// X, y , width , height, rounding
	ctx.roundRect(canvas.width * 0.78, canvas.height * 0.78, canvas.width * 0.2, canvas.height * 0.12, canvas.width * 0.015);
	ctx.stroke()
	ctx.closePath()
	//rectX+(rectWidth/2),rectY+(rectHeight/2)
	ctx.fillText("Main Menu", canvas.width * 0.78 +(canvas.width * 0.2 /2), canvas.height * 0.78+(canvas.height * 0.12/2));
	const end_image = new Image();
	end_image.src = "../assets/skis_end_screen.png";
	end_image.addEventListener("load", (e) => {
		ctx.drawImage(end_image, canvas.width*0.001, canvas.height*0.12, canvas.width*0.4, canvas.height*0.95);
		console.log("end image loaded")
	});
	
}

export function draw_item_bar(item_dict,loaded_items){
	// Temp
	const canvas = document.getElementById("game_window");
	let ctx = canvas.getContext("2d")
	
	// Items
	// Draw a light grey round rectangle as the background for the item icons
	ctx.strokeStyle = '#bbbbbb';
	ctx.lineWidth = 2;
	ctx.beginPath();
	//(x, y, width, height, radii)
	ctx.roundRect(canvas.width * 0.005, canvas.height*0.0012, canvas.width * 0.3, canvas.height*0.08, canvas.width*0.12);
	ctx.stroke();
	for (let i = 0; i < item_dict.length; i++) {
			const item = item_dict[i];
			const icon = loaded_items.find(img =>img.src.endsWith(item.icon_path.split('/').pop()));
			ctx.drawImage(icon, canvas.width * 0.02 + (i * (canvas.width * 0.3 / 5)), canvas.height * 0.001, canvas.width * 0.3 / 7, canvas.width * 0.3 / 7);
	}
}

export function ui_draw(score_, item_dict, loaded_items){
	// grab canvas and ctx as usual
	const canvas = document.getElementById("game_window");
	let ctx = canvas.getContext("2d")
	// Score
	ctx.font = '40px "Jersey 10"';
	ctx.fillStyle = '#000000';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillText(`Score: ${score_}`, canvas.width - (canvas.width * 0.05), 30);
	draw_item_bar(item_dict, loaded_items)
}