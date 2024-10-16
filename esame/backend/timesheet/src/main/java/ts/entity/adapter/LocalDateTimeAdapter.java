package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class LocalDateTimeAdapter implements JsonbAdapter<LocalDateTime, String> {
    // Definisce il pattern ISO 8601 con precisione millisecondi
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

    @Override
    public String adaptToJson(LocalDateTime dateTime) {
        // Converte LocalDateTime in stringa formattata
        return dateTime.format(FORMATTER);
    }

    @Override
    public LocalDateTime adaptFromJson(String dateTimeStr) {
        try {
            // Verifica se la stringa termina con 'Z', indica che la data è in UTC
            if (dateTimeStr.endsWith("Z")) {
                // Rimuove 'Z' e converte la stringa a LocalDateTime
                dateTimeStr = dateTimeStr.substring(0, dateTimeStr.length() - 1);
            }
            // Converte la stringa a LocalDateTime utilizzando il formatter
            return LocalDateTime.parse(dateTimeStr, FORMATTER);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Errore nel parsing della data: " + dateTimeStr, e);
        }
    }
}
