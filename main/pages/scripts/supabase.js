// Initialisiation of the Supabase client with the provided URL and publishable key (will be imported from environment variables in future)
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teGR1ZGRqcGxjd2Ntb3R1Z3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwODczNjksImV4cCI6MjA5MjY2MzM2OX0.b6PI52HrRzX8lmk_r34hDs-tyf2YdFfXYHcmCseUdy0'
const supabase_url = 'https://omxduddjplcwcmotugyn.supabase.co'
const supabaseClient = supabase.createClient(supabase_url, anon_key);
// Disclosure:  AI was used to help me understand the documentation and employ it within my game as supabase is very confusing 

// Sign-up method that requires email and password
// The async function allows other parts of the code to continue running while waiting for the response from the API.
async function sign_up(email, password) {
  	const { data, error } = await supabaseClient.auth.signUp({
		email: email,
    	password: password
  	})
	if (error) {
		throw error;
	}
	return data;
}

async function sign_in(email, password) {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: email,
		password: password
	})
	if (error) {
		throw error;
	}
  	return data;
}

async function get_info() {
  	return supabaseClient.auth.getUser()
}

async function sign_out() {
	return supabaseClient.auth.signOut()
}

// Save highscore to Supabase (just an integer)
async function save_highscore(score) {
	/** Saves highscore to the external database system

    Args:
        score(int) : The player's highscore
    Returns:
        N/a
	*/
	const { data: userData } = await supabaseClient.auth.getUser()
	
	const { error } = await supabaseClient
		.from('highscores')
		.insert({ user_id: userData.user.id, score: score })

	if (error) throw error
}

// Get user's highest score
async function get_user_highscore() {
		/** Saves highscore to the external database system

    Args:
        score(int) : The player's highscore
    Returns:
        score(int) : An int of tthe highscore or alternatively 0
	*/
	const { data: userData } = await supabaseClient.auth.getUser()
	const { data, error } = await supabaseClient
	.from('highscores')
	.select('score')
	.eq('user_id', userData.user.id)
	.order('score', { ascending: false })
	.limit(1)

	if (error) throw error
	return data[0]?.score || 0
}

// Save unlocked item URL
async function save_item(item_url) {
	/** Saves items to the external database system

    Args:
        item_url(str) : The image path prelavent in my game 
    Returns:
        N/a
	*/
	const { data: userData } = await supabaseClient.auth.getUser()

	const { error } = await supabaseClient
	.from('user_items')
	.insert({ user_id: userData.user.id, item_url: item_url })

	if (error) throw error
}

// Get all unlocked item URLs
async function get_user_items() {
	/** Gets all unlocked items

    Args:
        N/A
    Returns:
        unlocked_items(array of strings) : It's an array of the image paths for the items the logged item user has
	*/
	const { data: userData } = await supabaseClient.auth.getUser()

	const { data, error } = await supabaseClient
	.from('user_items')
	.select('item_url')
	.eq('user_id', userData.user.id)

	if (error) throw error
	return data.map(item => item.item_url)
}
