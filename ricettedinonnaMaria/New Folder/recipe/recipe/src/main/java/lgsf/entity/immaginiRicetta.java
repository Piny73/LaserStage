/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import lgsf.entity.constant.BaseEntity;

/**
 *
 * @author piny7
 */
@Entity
@Table(name = "immaginiricette")
public class ImmaginiRicetta extends BaseEntity{
    @Column(nullable = false)
    private String nome;
    
    @Lob
    @Column(nullable = false)
    private byte[] file;

    public ImmaginiRicetta() {}

    public ImmaginiRicetta(String nome, byte[] file) {
        this.nome = nome;
        this.file = file;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

}
