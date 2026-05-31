// Initialisiation of the Supabase client with the provided URL and publishable key (will be imported from environment variables in future)
const publishable_key = ''
const supabase_url = ''
const supabaseClient = supabase.createClient(supabase_url, publishable_key)


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
  await supabaseClient.from('profiles').insert({ id: data.user.id });
  return data;
}
// Sign-in method for anonymous users, users that do not have an account but can still want to play the game.
async function anonymous_sign_in(captchaToken) {
  return supabaseClient.auth.signInAnonymously({
    options: {
      captchaToken
    }
  })
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