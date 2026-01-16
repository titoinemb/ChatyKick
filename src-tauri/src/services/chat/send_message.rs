use serde_json::{json, Value};
use surf;
use tauri::command;

#[command]
pub async fn send_message(
    bearer_token: String,
    channel_id: String,
    message_type: String,
    metadata: Option<Value>,
    content: String,
) -> Result<Value, String> {
    let url: String = format!("https://kick.com/api/v2/messages/send/{}", channel_id);
    // make body for request
    let mut payload: Value = json!({
        "content": content,
        "type": message_type
    });
    // if metadata is not null add metadata in payload
    if let Some(meta) = metadata {
        payload["metadata"] = meta;
    }

    let client: surf::Client = surf::Client::new();

    let mut response: surf::Response = client
        .post(url)
        .body(
            surf::Body::from_json(&payload)
                .map_err(|_| "Erreur lors de la conversion JSON".to_string())?,
        )
        .header("Authorization", format!("Bearer {}", bearer_token))
        .header("Content-Type", "application/json")
        .header(
            "User-Agent",
            "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0",
        )
        .send()
        .await
        .map_err(|_| "Erreur lors de la requête HTTP".to_string())?;

    if response.status().is_success() {
        let body: String = response.body_string().await.unwrap();

        match serde_json::from_str::<Value>(&body) {
            Ok(parsed_body) => Ok(parsed_body),
            Err(e) => {
                println!("Erreur de parsing JSON : {:?}", e);
                Err("Erreur lors du parsing JSON".to_string())
            }
        }
    } else {
        Err(format!("Erreur: Statut HTTP {}", response.status()))
    }
}
