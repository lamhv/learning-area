let cols = ['id', 'client_id', 'service', 'process_status', 'result_delivered', 'input_params', 'metadata', 'more_details', 'process_result', 'created_at', 'updated_at', 'access_key_id', 'transaction_id', 'is_correct', 'ground_truth', 'completed_at', 'processed_time_ms', 'process_result_hash', 'customer_data_stripped', 'channel_id', 'x_request_id', 'is_encrypted', 'post_processed', 'raw_result', 'label', 'note', 'circle_id', 'x_request_id2', 'type', 'parent_access_key_id', 'user_consent'];
// let toastCols = ['input_params','metadata','more_details','process_result','ground_truth','raw_result','label','note','user_consent'];

// let toastCols = ['more_details', 'process_result'];
let toastCols = [];

function transCols(col) {
    if (toastCols.includes(col)) {
        return `\`${col}\` = CASE
                WHEN \`replica\`.\`${col}\` = '__debezium_unavailable_value' THEN \`changelog\`.\`${col}\`
                ELSE \`replica\`.\`${col}\`
              END
        `
    } else 
        return `\`${col}\` = \`replica\`.\`${col}\`` 
}

let tmpCols = cols.map(col => transCols(col));

console.log(tmpCols.join(','))
