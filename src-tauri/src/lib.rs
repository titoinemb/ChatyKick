// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod services {
    pub mod kicks_balance;
    pub mod get_channel_informations;
    pub mod bearer_checker;
    pub mod chat {
        pub mod identity {
            pub mod get_chat_identity;
        }
        pub mod chat_history;
        pub mod send_message;
        pub mod get_emotes;
        pub mod auth_socket;
        pub mod rules;
        pub mod get_user_infos;
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            services::kicks_balance::kicks_balance,
            services::get_channel_informations::get_channel_informations,
            services::bearer_checker::bearer_checker,
            services::chat::chat_history::chat_history,
            services::chat::send_message::send_message,
            services::chat::identity::get_chat_identity::get_chat_identity,
            services::chat::get_emotes::get_emotes,
            services::chat::auth_socket::auth_socket,
            services::chat::rules::rules,
            services::chat::get_user_infos::get_user_infos,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}