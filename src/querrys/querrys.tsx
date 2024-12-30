import { supabase } from "./supabase";



export const getUsers = async () => {
  try {
    const { data, error } = await supabase.from("moodle").select("*")

    if (error) {
      console.log(error)
      return null

    }
    if (data) {
      console.log(data)
      return data

    }
  } catch (e) {

    console.log(e)
    return null
  }




}
export const addUSers = async (title: string, description: string, area: string, autor: string) => {


  try {
    const { data, error } = await supabase.from("moodle").insert({ "name": title, "description": description, "area": area, "autor": autor })
    if (error) {
      console.log(error)
    }

    if (data) {
      console.log("siiiiuuuuu", data)
    }
  } catch (e) {

    console.log("catych an error ", e)
  }


}

export const updateUsers = async (title: string, description: string, area: string, autor: string) => {


  try {
    const { data, error } = await supabase.from("moodle").insert({ "name": title, "description": description, "area": area, "autor": autor })
    if (error) {
      console.log(error)
    }

    if (data) {
      console.log("siiiiuuuuu", data)
    }
  } catch (e) {

    console.log("catych an error ", e)
  }


}

export const relation = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        name_users, 
        new (
          id_courses,
          moodle (
            name
          )
        )
      `).eq("name_users","rauf")

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Data:', data);
      return data;
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
  }
};
