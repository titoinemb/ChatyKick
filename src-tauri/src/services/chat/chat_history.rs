use serde_json::{Number, Value};
use surf;
use tauri::command;

#[command]
pub async fn chat_history(channel_id: Number) -> Result<Value, String> {
    let url: String = format!("https://web.kick.com/api/v1/chat/{}/history", channel_id);

    let client: surf::Client = surf::Client::new();

    let mut response: surf::Response = client
        .get(&url)
        .header("Content-Type", "application/json")
        .header(
            "User-Agent",
            "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0",
        )
        .send()
        .await
        .map_err(|_| "Erreur lors de la requête HTTP".to_string())?;

    if response.status().is_success() {
        let body: String = response
            .body_string()
            .await
            .map_err(|_| "Erreur lors de la lecture du body".to_string())?;

        match serde_json::from_str::<Value>(&body) {
            Ok(parsed_body) => Ok(parsed_body),
            Err(e) => {
                println!("JSON brut:\n{}", body);
                println!("Erreur de parsing JSON : {:?}", e);
                Err("Erreur lors du parsing JSON".to_string())
            }
        }
    } else {
        Err(format!("Erreur: Statut HTTP {}", response.status()))
    }
}
