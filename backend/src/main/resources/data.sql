CREATE TABLE IF NOT EXISTS TASKS (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    TITLE VARCHAR(255),
    DESCRIPTION VARCHAR(255),
    STATUS VARCHAR(50),
    PRIORITY VARCHAR(50),
    CATEGORY VARCHAR(100),
    CREATED_AT TIMESTAMP
);

INSERT INTO TASKS (TITLE, DESCRIPTION, STATUS, PRIORITY, CATEGORY, CREATED_AT) VALUES
('Revisar indice de solvencia', 'Verificar APR del mes actual', 'PENDING', 'HIGH', 'Riesgo', CURRENT_TIMESTAMP),
('Automatizar reporte de APR', 'Script Python para calculo automatico', 'IN_PROGRESS', 'HIGH', 'Contabilidad', CURRENT_TIMESTAMP),
('Validar indices de liquidez', 'Revision mensual de ratios financieros', 'COMPLETED', 'MEDIUM', 'Riesgo', CURRENT_TIMESTAMP),
('Migrar datos a SQL Server', 'ETL de datos historicos financieros', 'PENDING', 'HIGH', 'Base de Datos', CURRENT_TIMESTAMP),
('Conciliacion bancaria mensual', 'Verificar movimientos con extracto', 'IN_PROGRESS', 'MEDIUM', 'Contabilidad', CURRENT_TIMESTAMP);