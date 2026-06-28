// Classes
let canvas = document.getElementById("game_window")
let ctx = canvas.getContext("2d")
export class Character{
	constructor(character_angle,item_dict,score) {
		this.position = [canvas.width / 2,canvas.height/3];
		this.character_angle = 0;
		this.base_speed = 5 //General speed downhill
		this.turn_velocity = 0 // angular momentum
		this.turn_acceleration = this.base_speed;	 // how fast turning builds
		this.friction = 0.92 	// how fast turning slows
		this.max_turn_velocity = 0.15,  // clamp velocity to keep it reasonable
		this.item_dict = item_dict;
		this.score = score
		this.life_boolean = false
		this.sprite = new Image()
    	this.sprite.src = "../assets/character/front.png";
	}
	update_speed(updated_speed){
		this.speed= updated_speed
	}
	get_speed(){
		return this.speed
	}
	add_item(item){
		this.item_dict.push(item)
		if (item.type === "" ){
			this.life_boolean = true
		}else if (item.type === "speed"){
			this.base_speed += item.change
		}else if (item.type === "obstacle_luck"){
			item_interval -= item.change

		}
	}
	get_angle() {
		return this.character_angle;
	}
	update_angle(){
		
	}
	//
	get_item_luck(){
		return this.item_luck
	}
	change_obstacle_luck(){

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
		this.src = src
		this.radius = radius
		this.id = id
		this.image = image
	}
}

export class item{
	constructor(description,icon_path) {
		let name = icon_path.split(".")[0]
		let space_name = name.replace("_"," ")
		let final_name = space_name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
		console.log(final_name)
		this.name = final_name
		this.description = description;	
		this.icon_path = icon_path;
	}
	fetch_description(){
		return this.description
	}
	fetch_icon(){
		return this.icon_path
	}
}

export class life_item extends item{
	constructor(description,icon_path) {
		super(description,icon_path);
	}
	abillity(player_) {
		player_(life_boolean)
	}
}

export class item_luck_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path);
	}
	abillity() {

	}
}

export class speed_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path);
	}
	mobility_item_effect(){

	}
}

export class obstacle_luck_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path);
	}
	abillity() {

	}
}

export class score_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path)
	}
}