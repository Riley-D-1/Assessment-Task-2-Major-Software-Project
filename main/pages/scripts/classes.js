// Classes
export class Character{
	constructor(character_angle,item_dict,score,canvas) {
		this.position = [canvas.width / 2,canvas.height/3];
		this.character_angle = direction;
		this.base_speed = 5
		this.y_speed = speed;
		this.x_speed = x_speed
		this.item_dict = item_dict;
		this.score = score
		this.life_boolean = false
	}
	update_speed(updated_speed){
		this.speed= updated_speed
	}
	get_speed(){
		return this.speed
	}
	add_item(item){
		this.item_dict.push(item)
		if (item.type){
			this.life_boolean = true
		}else if (item.type){
			this.base_speed += item.change
		}else{
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
}

export class Obstacle{
	constructor(postion_x,postion_y,src,size_x,size_y) {
		this.position = [postion_x,postion_y];
		this.size_x =  size_x
		this.size_y = size_y
		this.src = src
	}
}

export class item{
	constructor(rarity,description,icon_path) {
		this.rarity = rarity;
		this.description = description;	
		this.icon_path = icon_path;
	}
	fetch_description(){
		return this.description
	}
	fetch_rarity(){
		return this.rarity
	}
	fetch_icon(){
		return this.icon_path
	}

}

export class life_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path);
	}
	abillity(player_) {
		player_(life_boolean)
	}
}

	export class luck_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path);
	}
	abillity() {

	}
}

	export class mobility_item extends item{
	constructor(rarity,description,icon_path) {
		super(rarity,description,icon_path);
	}
	mobility_item_effect(){

	}
	}