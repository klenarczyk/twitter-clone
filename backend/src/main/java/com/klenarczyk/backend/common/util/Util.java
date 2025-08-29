package com.klenarczyk.backend.common.util;

public class Util {

    public static boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }

    public static boolean isDifferent(String newValue, String currentValue) {
        return newValue != null && !newValue.equals(currentValue);
    }

    public static boolean isNotBlankAndDifferent(String newValue, String currentValue) {
        return newValue != null && !newValue.isBlank() && !newValue.equals(currentValue);
    }

}
