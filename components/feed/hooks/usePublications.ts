import { experiencesApi } from "@/lib/data/publications";
import { Publication } from "@/lib/data/types";
import { useEffect, useState } from "react";

export const usePublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const fetchPublications = async () => {
      try {
        setLoading(true);
        const data = await experiencesApi.getAll();

        if (isMounted) {
          setPublications(data);
        }
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPublications();

    return () => {
      isMounted = false; // Evita fugas de memoria si el componente se desmonta mientras carga
    };
  }, []);
  return {
    loading,
    publications,
  };
};
