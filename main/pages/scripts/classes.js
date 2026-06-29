// Classes
let canvas = document.getElementById("game_window")
let ctx = canvas.getContext("2d")

const item_data = {
    "../assets/items/medkit.png": {
        name: "Medkit",
        type: "life",
        change: 1,
        description: "Patch yourself up in case of a fall."
    },
    "../assets/items/snowball.png": {
        name: "Snowball",
        type: "life",
        change: 1,
        description: "The snowball should cushion your fall. Snow is soft right…?"
    }, 
    "../assets/items/pizza.png": {
        name: "Pizza",
        type: "life",
        change: 1,
        description: "Pizza is life! A hot slice of pizza is all you need to keep going."
    },
    "../assets/items/muffin.png": {
        name: "Muffin",
        type: "speed",
        change: -0.5,
        description: "Delicious... but unhealthy. You've been slowed down by obesity."
    },
    "../assets/items/goggles.png": {
        name: "Goggles",
        type: "speed",
        change: 0.5,
        description: "You can go faster without the wind in your eyes."
    },
    "../assets/items/chocolate_bar.png": {
        name: "Chocolate Bar",
        type: "speed",
        change: 0.5,
        description: "SUGAR BABY! Increase your speed."
    },
    "../assets/items/coin.png": {
        name: "Coin",
        type: "item_luck",
        change: 1,
        description: "Fancy some gambling? Flips a coin to double or remove your item chance."
    },
    "../assets/items/sandwich.png": {
        name: "Sandwich",
        type: "item_luck",
        change: 1,
        description: "A satisfying snack that sharpens your focus, allowing you to spot other items strewn across the slope."
    },
    "../assets/items/apple.png": {
        name: "Apple",
        type: "obstacle_luck",
        change: 1,
        description: "An apple a day keeps the trees away… usually."
    },
    "../assets/items/pet_rock.png": {
        name: "Pet Rock",
        type: "obstacle_luck",
        change: 1,
        description: "A loyal little companion that somehow scares away some obstacles."
    },
    "../assets/items/cola.png": {
        name: "Cola",
        type: "score",
        change: 10,
        description: "A fizzy boost that sends your score soaring."
    },
    "../assets/items/mini_snowman.png": {
        name: "Snowman",
        type: "score",
        change: 10,
        description: "Cool under pressure, your frosty friend helps boost your score."
    }
}

export class Character{
	constructor(score) {
		// Position
		this.x = canvas.width / 2
		this.y = canvas.height / 2
		// Movement
		this.heading = Math.PI / 2
		this.character_angle = 0
		this.vx = 0
		this.vy = 0
		this.speed = 0;
		this.base_speed = 3;
		this.acceleration = this.base_speed * 0.05;
		this.drag = 0.985
		this.edge_grip = 0.12;
		this.lean = 0
		this.turn_velocity = 0
		this.turn_acceleration = this.base_speed * 0.01;
		this.friction = 0.65;
		this.max_turn_velocity = 0.18;

		// Items & stats
		this.item_dict = []
		this.score = score;
		this.life_boolean = false;
		this.item_luck = 0
		this.obstacle_luck = 0
		this.score_mult = 1
		// Sprite
		this.sprite = new Image();
		this.sprite.src = "../assets/character/front.png";
		this.sync_motion_stats();
	}

	sync_motion_stats(){
		this.maxSpeed = this.base_speed * 3.6;
		this.acceleration = this.base_speed * 0.05;
	}
	add_item(item_icon){
		const new_item = new item(item_icon);
		if (new_item.type === "life" ){
			this.life_boolean = true
		}else if (new_item.type === "speed"){
			this.base_speed += new_item.change
			this.sync_motion_stats();
		}else if (new_item.type === "obstacle_luck"){
			item_interval -= new_item.change
		}else if (new_item.type === "item_luck"){
			this.item_luck += new_item.change
		}else if (new_item.type === "score"){
			this.score_mult += new_item.change
		}
		// Store the item in the player's inventory
		this.item_dict.push(new_item);
	}
	get_angle() {
		return this.character_angle;
	}
	get_item_luck(){
		return this.item_luck
	}
	get_obstacle_luck(){
		return this.obstacle_luck
	}
	return_sprite(){
		return this.sprite
	}
}
export class Obstacle{
	constructor(postion_x,postion_y,src,size_x,size_y,radius,id,image) {
		this.x = postion_x
		this.y = postion_y
		this.size_x =  size_x
		this.size_y = size_y
		this.width = size_x
		this.height = size_y
		this.src = src
		this.radius = radius
		this.id = id
		this.image = image
		this.img = image || null
	}
}

export class item{
	constructor(icon_path) {
		const data = item_data[icon_path]
        this.icon_path = icon_path
        this.name = data.name
        this.type = data.type
        this.change = data.change
        this.description = data.description
	}
	fetch_description(){
		return this.description
	}
	fetch_icon(){
		return this.icon_path
	}
}

