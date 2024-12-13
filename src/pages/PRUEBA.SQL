SELECT 
    CONCAT (q.AlmacenDestino, ' ', q.Destino) AS destino,
    LEFT(q.Solicitante, 25) AS solicitante,
    q.Producto AS producto,
    q.Cantidad AS cantidad,
    q.Orden AS orden,
    q.Situacion AS situacion,
    DATEDIFF(MINUTE, MAX(q.INICIO_Surtido), GETDATE()) / 1440 AS dias,
    LEFT(CONVERT(VARCHAR, DATEADD(MINUTE, 
        ((DATEDIFF(MINUTE, MAX(q.INICIO_Surtido), GETDATE())) - 
        ((DATEDIFF(MINUTE, MAX(q.INICIO_Surtido), GETDATE()) / 1440) * 1440)), ''), 108), 5) AS hhmm,
    q.operador AS operador
FROM (
    SELECT DISTINCT 
        Alm.Nombre AS Destino,
        Inv.AlmacenDestino AS AlmacenDestino,
        Usuario.Nombre AS Solicitante,
        Art.nombreCorto AS Producto,
        SUM(InvD.Cantidad) AS Cantidad,
        Inv.MovID AS Orden,
        sq.tc AS INICIO_Surtido,
        MovTiempo.Situacion AS Situacion,
        Agente.Nombre AS operador
    FROM Inv
    INNER JOIN InvD ON Inv.ID = InvD.ID AND Inv.Estatus = 'PENDIENTE'
    INNER JOIN Alm ON Inv.AlmacenDestino = Alm.Almacen
    INNER JOIN Alm AS Alm_1 ON Inv.Almacen = Alm_1.Almacen
    INNER JOIN Usuario ON Inv.Usuario = Usuario.Usuario
    INNER JOIN Art ON Art.articulo = InvD.articulo
    LEFT JOIN Tma ON Tma.origenID = Inv.movID AND Tma.OrigenTipo = 'INV'
    LEFT JOIN Agente AS Agente ON Agente.Agente = Tma.Agente
    INNER JOIN (
        SELECT Max(MovTiempo.FechaComenzo) AS tc, MovTiempo.ID
        FROM MovTiempo 
        WHERE MovTiempo.Estatus <> 'CONCLUIDO'
          AND MovTiempo.Estatus <> 'CANCELADO'
          AND MovTiempo.FechaComenzo > '01-02-2024'
          AND MovTiempo.Modulo = 'INV'
          AND MovTiempo.Situacion <> 'Pendiente'
        GROUP BY ID
    ) AS sq ON sq.ID = Inv.ID 
    INNER JOIN MovTiempo ON MovTiempo.ID = Inv.ID 
        AND MovTiempo.FechaComenzo = sq.tc
        AND MovTiempo.FechaComenzo > '01-02-2024'
        AND MovTiempo.Estatus <> 'CONCLUIDO'
        AND MovTiempo.Estatus <> 'CANCELADO'
        AND MovTiempo.Modulo = 'INV'
    WHERE Inv.estatus = 'pendiente'
      AND MovTiempo.Situacion <> 'Surtido'
    GROUP BY Alm.Nombre, Inv.AlmacenDestino, Usuario.Nombre, Art.NombreCorto, Inv.MovID, sq.tc, Agente.Nombre, Inv.ID, MovTiempo.Situacion, Alm_1.Nombre, TMA.ID
) AS q
GROUP BY q.Orden, q.Destino, q.AlmacenDestino, q.Solicitante, q.Producto, q.Cantidad, q.operador, q.Situacion
ORDER BY dias DESC, hhmm DESC


select * from Alm where almacen = 'MX-01'

select * from MovTiempo