/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/*package lgsf.services;



import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import javax.persistence.Table;
import lgsf.entity.ImmaginiRicetta;

@Table(name = "immaginiricetta")
public class ImmaginiRicettaServices {

    private final Path rootLocation = Paths.get("uploads/immagini");

 
    private ImmaginiRicettaRepository immaginiricettarepository;

    public ImmaginiRicetta store(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName));

        ImmaginiRicetta immaginiricetta = new ImmaginiRicetta(fileName, file.getContentType(), file.getSize());
        return immaginiricettarepository.save(immaginiricetta);
    }

    public Optional<ImmaginiRicetta> getImage(Long id) {
        return ImmaginiRicettaRepository.findById(id);
    }

    public byte[] loadImage(String fileName) throws IOException {
        Path filePath = rootLocation.resolve(fileName);
        return Files.readAllBytes(filePath);
    }
}*/
