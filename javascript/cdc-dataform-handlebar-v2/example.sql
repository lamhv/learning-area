SELECT * REPLACE (
    fns.setJson(
            input_data,
            TO_JSON_STRING(
                    ARRAY_CONCAT(
                            ARRAY(
                                    SELECT JSON_SET(__mapping_value__, '$.value', IF(
                                    __json_value__ IS NULL OR LENGTH(TRIM(__json_value__)) = 0,
                                    __json_value__,
                                    fns.encryptEtl(fns.legacyFormatPhoneNumber(__json_value__, 'VN'))
                                                                                  ))
                                    FROM
                                    (SELECT __mapping_value__, JSON_VALUE(__mapping_value__, '$.value') __json_value__
                                     FROM UNNEST(
                                                  JSON_EXTRACT_ARRAY(
                                                          PARSE_JSON(fns.extractJson(input_data, ['$.phone_number']))
                                                  )
                                          ) __mapping_value__)
                            ),
                            ARRAY(
                                    SELECT JSON_SET(__mapping_value__, '$.value', IF(
                                    __json_value__ IS NULL OR LENGTH(TRIM(__json_value__)) = 0,
                                    __json_value__,
                                    fns.encryptEtl(fns.formatNationalId(__json_value__, 'VN'))
                                                                                  ))
                                    FROM
                                    (SELECT __mapping_value__, JSON_VALUE(__mapping_value__, '$.value') __json_value__
                                     FROM UNNEST(
                                                  JSON_EXTRACT_ARRAY(
                                                          PARSE_JSON(fns.extractJson(input_data, ['$.id_values[*]']))
                                                  )
                                          ) __mapping_value__)
                            )
                    )
            )
    ) AS input_data
    )
FROM cdc_dataform_requests
WHERE (_PARTITIONTIME >= TIMESTAMP_TRUNC(TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR), HOUR) OR
       _PARTITIONTIME IS NULL)