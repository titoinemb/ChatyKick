use serde_json::Value;
use surf;
use tauri::command;

#[command]
pub async fn kicks_balance(bearer_token: String) -> Result<Value, String> {
    let url: &str = "https://web.kick.com/api/v1/kicks/balance";

    let client: surf::Client = surf::Client::new();

    let mut response: surf::Response = client
        .get(url)
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
        let body = response.body_string().await.unwrap();

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
