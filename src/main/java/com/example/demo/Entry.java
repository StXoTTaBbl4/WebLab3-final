package com.example.demo;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity(name = "Entry")
@Table(name = "hits")
public class Entry implements Serializable {

    @Id
    @SequenceGenerator(name = "jpaSequence", sequenceName = "JPA_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    @Column(name = "id")
    private int id = 4;
    @Column(name = "xvalue")
    private Double xValue;
    @Column(name = "yvalue")
    private Double yValue;
    @Column(name = "rvalue")
    private Double rValue;
    @Column(name = "ishit")
    private boolean hitResult;

    public Entry(){}

    private boolean checkTriangle() {
        return xValue <=0 && yValue <=0 && (Math.abs(yValue + xValue) < rValue);
    }

    private boolean checkRectangle() {
        return xValue <= 0 && yValue >= 0 && Math.abs(xValue) <= rValue && Math.abs(yValue) <= rValue /2;
    }

    private boolean checkCircle() {
        return xValue >= 0 && yValue <= 0 && xValue*xValue + yValue*yValue <= rValue*rValue/4.0;
    }

    public void checkHit() {
        hitResult = checkTriangle() || checkRectangle() || checkCircle();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Double getxValue() {
        return xValue;
    }

    public void setxValue(Double xValue) {
        this.xValue = Math.round(xValue*1000.0)/1000.0;
    }

    public Double getyValue() {
        return yValue;
    }

    public void setyValue(Double yValue) {
        this.yValue = Math.round(yValue*1000.0)/1000.0;
    }

    public Double getrValue() {
        return rValue;
    }

    public void setrValue(Double rValue) {
        this.rValue = Math.round(rValue*1000.0)/1000.0;
    }

    public Boolean getHitResult() {
        return hitResult;
    }

    public void setHitResult(boolean hitResult) {
        this.hitResult = hitResult;
    }

    @Override
    public String toString() {
        return "Entry{" +
                "xValue=" + xValue +
                ", yValue=" + yValue +
                ", rValue=" + rValue +
                ", hitResult=" + hitResult +
                '}';
    }

    @Override
    public int hashCode() {
        return xValue.hashCode() + yValue.hashCode() +
                rValue.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof Entry) {
            Entry entryObj = (Entry) obj;
            return xValue.equals(entryObj.getxValue()) &&
                    yValue.equals(entryObj.getyValue()) &&
                    rValue.equals(entryObj.getrValue());
        }
        return false;
    }
}

