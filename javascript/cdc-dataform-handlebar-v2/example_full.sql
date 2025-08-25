SELECT * REPLACE (
    IF(
            id_number IS NULL OR LENGTH(TRIM(id_number)) = 0,
            id_number,
            fns.encryptEtl(fns.formatNationalId(id_number, 'VN'))
    ) AS id_number, fns.setJson(
            card_info,
            TO_JSON_STRING(
                    ARRAY_CONCAT(
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
                                                          PARSE_JSON(fns.extractJson(card_info,
                                                                                     ['$..id_number','$..other_id_number','$.card_info[?(@.field=="id")].value']))
                                                  )
                                          ) __mapping_value__)
                            )
                    )
            )
                    ) AS card_info, fns.setJson(
            qr_code,
            TO_JSON_STRING(
                    ARRAY_CONCAT(
                            ARRAY(
                                    SELECT JSON_SET(__mapping_value__, '$.value', ARRAY_TO_STRING(
                                    ARRAY(
                                            SELECT IF(__offset__ in (0, 1), IF(
                                            __splited__ IS NULL OR LENGTH(TRIM(__splited__)) = 0,
                                            __splited__,
                                            fns.encryptEtl(fns.formatNationalId(__splited__, 'VN'))
                                                                            ), __splited__)
                                            FROM UNNEST(split(__json_value__, '|')) __splited__ WITH OFFSET __offset__
                                    ),
                                    '|'
                                                                                  ))
                                    FROM
                                    (SELECT __mapping_value__, JSON_VALUE(__mapping_value__, '$.value') __json_value__
                                     FROM UNNEST(
                                                  JSON_EXTRACT_ARRAY(
                                                          PARSE_JSON(fns.extractJson(qr_code, ['$.result']))
                                                  )
                                          ) __mapping_value__)
                            )
                    )
            )
                                    ) AS qr_code, fns.setJson(
            search_face_result,
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
                                                          PARSE_JSON(fns.extractJson(search_face_result, ['$..phone_number']))
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
                                                          PARSE_JSON(fns.extractJson(search_face_result, ['$..id_number']))
                                                  )
                                          ) __mapping_value__)
                            )
                    )
            )
                                                  ) AS search_face_result
    )
FROM cdc_dataform_ekyc_ocrs
WHERE (_PARTITIONTIME >= TIMESTAMP_TRUNC(TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR), HOUR) OR
       _PARTITIONTIME IS NULL)