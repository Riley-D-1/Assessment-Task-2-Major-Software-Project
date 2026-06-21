// This file contains Menu related logic and UI related logic for the game

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


export function inbetween_menu(username,unlocked_items){
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
	
	//Grab the unlocked items

	// !
	//const unlockedItems = await get_user_items()


	// Font styling 
	ctx.textAlign = "center";
	ctx.font = '40px "Jersey 10"';
	ctx.fillStyle = '#000000';
	ctx.textBaseline = 'middle';
	// Draw the character
	character_draw(canvas.width / 2-(canvas.width * 0.25), canvas.height * 0.06, canvas.width * 0.4, canvas.height * 0.9, "../../main/assets/character/front.png", ctx)

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

	let random_saying = ["Send it →", "Good Luck! →", "Have Fun! →", "Don't Crash! →", "Ski Fast! →", "Last Lap, Best Lap →", "Ride the chair →", "Drop in →", "Remember to have fun! →", "Ski you later! →"]
	ctx.fillText(random_saying[Math.floor(Math.random() * random_saying.length)], canvas.width * 0.78+(canvas.width * 0.2/2),canvas.height * 0.85+(canvas.height * 0.1/2));



	// Difficulty 
	ctx.fillText("Difficulty", canvas.width * 0.005 + ( canvas.width * 0.125/2),canvas.height*0.03)
	// Difficulty Selector
	let selecrted_difficulty = null
	let difficulty_rects = []
	for (let i = 0; i < 3; i++) {		
		ctx.beginPath();
		// (x, y, width, height, radii)
		ctx.roundRect(canvas.width * 0.005, canvas.height * 0.08 + i * (canvas.height * 0.12), canvas.width * 0.125, canvas.height * 0.08, canvas.width * 0.005);
		difficulty_rects.push({ x: (canvas.width * 0.005), y: (canvas.height * 0.08 + i * (canvas.height * 0.12)), width: (canvas.width * 0.125), height: (canvas.height * 0.08) })
		if(i === 0){
			ctx.strokeStyle = '#2f9e44'
			if (selecrted_difficulty == "bluebird" || selecrted_difficulty === null) {
				ctx.fillStyle = '#b2f2bb';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else if (i === 1){
			ctx.strokeStyle = '#1971c2'
			if (selecrted_difficulty == "flurry") {
				ctx.fillStyle = '#a5d8ff';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else if (i === 2){
			ctx.strokeStyle = '#000000';
			if (selecrted_difficulty == "whiteout") {
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
		"../assets/items/purple_googles.png",
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
		img.src = url;
		img.onload = () => {
			// Render the image onto the context
			//Img,  X, Y, Image Width, Image Height
			ctx.drawImage(img, (canvas.width * 0.759 + index % 3 * (canvas.width * 0.08)), (canvas.height * 0.12 + Math.floor(index / 3) * (canvas.height * 0.15)), (canvas.width * 0.06), (canvas.height * 0.14));
			item_grid.push({src: url, x: (canvas.width * 0.76 + index % 3 * (canvas.width * 0.08)), y: (canvas.height * 0.12 + Math.floor(index / 3) * (canvas.height * 0.15)), width: (canvas.width * 0.06), height: (canvas.height * 0.14) })
		};
	})
	console.log(item_grid)
	// Do corresponding click action
	canvas.addEventListener('click', function(event) {
		console.log("kachow")
		const bounds = canvas.getBoundingClientRect();
		for (let i = item_grid.length - 1; i >= 0; i--) {
   		 	const item = item_grid[i];
			if (
				(event.clientX - bounds.left) >= item.x &&
				(event.clientX - bounds.left) <= item.x + item.width &&
				(event.clientY - bounds.top) >= item.y &&
				(event.clientY - bounds.top) <= item.y + item.height
			)
			 {
				alert(`Clicked inside ${item.src}`);
				// Draw a rectangle around the item.
				

			}
			
		}
		// Check clicks for 
		for (let i = difficulty_rects.length - 1; i >= 0; i--){
			if(
			(event.clientX - bounds.left) >= difficulty_rects.x &&
			(event.clientY - bounds.top) <= difficulty_rects.x + difficulty_rects.width &&
			(event.clientY - bounds.top) >= difficulty_rects.y &&
			(event.clientY - bounds.top) <= difficulty_rects.y + difficulty_rects.height	
			){
				console.log("filler")
			}
		}
			
		
	});

}


function character_draw(x,y,width,height,current_sprite_dir,ctx){
	const image = new Image();
	image.src = current_sprite_dir;
	image.addEventListener("load", (e) => {
		ctx.drawImage(image, x, y, width, height)
	});	
}

function end_screen(score_,){
	/** Displays the end screen after death (in the core game)

    Args:
		score (int) :  The final score of the player

    Returns:
        N/A
	*/


	// Getting ctx and canvas to draw on
	canvas = document.getElementById("game_window")
	ctx = canvas.getContext("2d")

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
	let high_score_ = 1100
	let obstacles_spawned = 2
	let item_count = 1
	// Statistics
	ctx.font = "50px 'Jersey 10'";
	ctx.textAlign = "left";
	//+(canvas.width * 0.45/4)
	ctx.fillText(`Score: ${score_}`, canvas.width * 0.8, canvas.height * 0.35);
	ctx.fillText(`High Score: ${high_score_}`, canvas.width * 0.51, canvas.height * 0.35);
	
	ctx.fillText(`Obstacles Dodged: ${high_score_}`, canvas.width * 0.51, canvas.height * 0.25);
	ctx.fillText(`Items: ${item_count}`, canvas.width * 0.8, canvas.height * 0.25);	


	// Use a function to draw the item bar
	//draw_item_bar(x,y)
	ctx.textAlign = "center";
	ctx.fillText("You've unlocked:",canvas.width * 0.69, canvas.height * 0.6)

	// Draw all unlocked items from the run
	// temp testing 
	unlocked_items = [""]

	//rectX+(rectWidt



	
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
	});

	canvas.addEventListener('click', function(event) {
	const bounds = canvas.getBoundingClientRect();

	// Check for a collision
	if (
		(event.clientX - bounds.left) >= canvas.width * 0.78 &&
		(event.clientY - bounds.top) <= canvas.width * 0.78 +  canvas.width * 0.2 &&
		(event.clientY - bounds.top) >= canvas.height * 0.78 &&
		(event.clientY - bounds.top) <= canvas.height * 0.78 + canvas.height * 0.12
		) {
		alert("Clicked inside:");
		// Perform your custom action here
		}
	});
}

function draw_item_bar(item_dict){
	// Temp
	canvas = document.getElementById("game_window")
	console.log(canvas)
	ctx = canvas.getContext("2d")
	
	// Items
	// Draw a light grey round rectangle as the background for the item icons
	ctx.strokeStyle = '#bbbbbb';
	ctx.lineWidth = 2;
	ctx.beginPath();
	//(x, y, width, height, radii)
	ctx.roundRect(canvas.width * 0.005, canvas.height*0.0012, canvas.width * 0.3, canvas.height*0.08, canvas.width*0.12);
	ctx.stroke();
	for (let i = 0; i < item_dict.length; i++) {
		let item = item_dict[i];
		let img = new Image();
		img.src = item.fetch_icon();
		ctx.drawImage(img, 10 + (i * 40), 10, 30, 30);
	}
}

function ui_draw(score_, item_dict){
	// grab canvas and ctx as usual
	canvas = document.getElementById("game_window")
	ctx = canvas.getContext("2d")
	
	// Score
	ctx.font = '40px "Jersey 10"';
	ctx.fillStyle = '#000000';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillText(`Score: ${score_}`, canvas.width - (canvas.width * 0.05), 30);
	draw_item_bar(item_dict)
}