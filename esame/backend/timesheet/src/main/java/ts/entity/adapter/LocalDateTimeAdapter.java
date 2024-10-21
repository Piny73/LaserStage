package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class LocalDateTimeAdapter implements JsonbAdapter<LocalDateTime, String> {

    // Formatter per la data nel formato ISO 8601 con precisione fino ai minuti (senza secondi)
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

    @Override
    public String adaptToJson(LocalDateTime dateTime) {
        // Converte LocalDateTime in stringa formattata (senza secondi)
        return dateTime.format(FORMATTER);
    }

    @Override
    public LocalDateTime adaptFromJson(String dateTimeStr) {
        try {
            // Se la stringa termina con 'Z', indica che è in UTC: la rimuoviamo per gestirla localmente
            if (dateTimeStr.endsWith("Z")) {
                dateTimeStr = dateTimeStr.substring(0, dateTimeStr.length() - 1);
            }
            // Converte la stringa a LocalDateTime utilizzando il formatter per gestire solo ore e minuti
            return LocalDateTime.parse(dateTimeStr, FORMATTER);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Errore nel parsing della data: " + dateTimeStr, e);
        }
    }
}