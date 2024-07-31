/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lgsf.entity.Adapter.RicettaTypeAdapter;
import lgsf.entity.constant.BaseEntity;

/**
 * @author piny73
 */
@Entity
@Table(name = "immaginiricetta")
public class ImmaginiRicetta extends BaseEntity{
    private String fileName;
    private String fileType;
    private long fileSize;
    
    @JsonbTypeAdapter(RicettaTypeAdapter.class)
    @ManyToOne(optional = true)
    @JoinColumn(name = "ricetta_Id")
    private Ricetta ricetta;

    public ImmaginiRicetta() {
    }

    public ImmaginiRicetta(String fileName, String fileType, long fileSize) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }
    
    

}