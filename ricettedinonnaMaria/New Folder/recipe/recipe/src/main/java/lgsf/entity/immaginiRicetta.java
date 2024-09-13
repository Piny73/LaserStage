/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.json.bind.annotation.JsonbProperty;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import lgsf.entity.constant.BaseEntity;

/**
 *
 * @author piny7
 */
public class ImmaginiRicetta extends BaseEntity{
    
    @JsonbProperty(value = "file")
    @NotBlank
    @Column(name = "file", nullable = false)
    private byte[] file;
    
    @JsonbProperty(value = "nome")
    @NotBlank
    @Column(name = "nome", nullable = false)
    private String nome;
    
    @JsonbProperty(value = "ricetta_id")
    @NotBlank
    @Column(name = "ricetta_id", nullable = false)
    private Long ricetta_id;

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getRicetta_id() {
        return ricetta_id;
    }

    public void setRicetta_id(Long ricetta_id) {
        this.ricetta_id = ricetta_id;
    }
    
    
}
