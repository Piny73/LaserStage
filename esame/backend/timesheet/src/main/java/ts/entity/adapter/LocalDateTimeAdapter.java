package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class LocalDateTimeAdapter implements JsonbAdapter<LocalDateTime, String> {

    // Utilizza il formatter ISO 8601
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    @Override
    public String adaptToJson(LocalDateTime dateTime) {
        // Converte LocalDateTime in stringa formattata
        return dateTime.atZone(ZoneId.systemDefault()).format(FORMATTER);
    }

    @Override
    public LocalDateTime adaptFromJson(String dateTimeStr) {
        try {
            // Gestisce il formato UTC
            if (dateTimeStr.endsWith("Z")) {
                // Se termina con "Z", convertiamo la stringa in OffsetDateTime e poi in LocalDateTime
                return OffsetDateTime.parse(dateTimeStr).toLocalDateTime();
            } else {
                // Altrimenti, utilizziamo il formatter specificato
                return LocalDateTime.parse(dateTimeStr, FORMATTER);
            }
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Errore nel parsing della data: " + dateTimeStr, e);
        }
    }
}


