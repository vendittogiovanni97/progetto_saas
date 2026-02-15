import { Box, IconButton } from "@mui/material";
import { useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface BaseItem {
  id: string;
  [key: string]: any;
}

interface UseTableColumnsOptions<T extends BaseItem> {
  onEdit?: (item: T) => void;
  onInfo?: (item: T) => void;
  onDelete?: (item: T) => void;
  onDownload?: (item: T) => void;
  onUpload?: (item: T) => void;
  additionalColumns: any;
  showActions?: boolean;
  showDownload?: boolean;
  showUpload?: boolean;
  showInfo?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteConfirmMessage?: string;
}

export function useTableColumns<T extends BaseItem>({
  onEdit,
  onInfo,
  onDelete,
  onDownload,
  onUpload,
  additionalColumns,
  showActions = true,
  showInfo = true,
  showEdit = true,
  showDelete = true,
  showDownload = false,
  showUpload = false,
  deleteConfirmMessage = "Sei sicuro di voler eliminare questo elemento?",
}: UseTableColumnsOptions<T>) {
  return useMemo<any[]>(() => {
    const handleDelete = async (item: T) => {
      const result = await Swal.fire({
        title: "Conferma per eliminare!",
        text: "Se elimini la pratica non potrai più recuperarla.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        confirmButtonColor: "#d32f2f",
        cancelButtonColor: "#6b7280",
        reverseButtons: true,
        focusCancel: true,
      });

      if (result.isConfirmed) {
        onDelete?.(item);
        await Swal.fire({
          title: "Eliminato",
          text: "L'elemento è stato eliminato correttamente.",
          icon: "success",
          timer: 1300,
          showConfirmButton: false,
        });
      }
    };

    const baseColumns: any[] = [
      {
        headerName: "ID",
        field: "id" as any,
        width: 100,
        hide: true,
      },
      ...additionalColumns,
    ];

    if (showActions) {
      baseColumns.push({
        headerName: "Azioni",
        width: 150,
        pinned: "right",
        sortable: false,
        filter: false,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
        },
        cellRenderer: ({ data }: any) => (
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            {/*       {showInfo && onInfo && (
              <IconButton
                size="small"
                onClick={() => onInfo(data!)}
                sx={{
                  backgroundColor: "info.main",
                  color: "white",
                  "&:hover": { backgroundColor: "info.dark" },
                }}
                aria-label="Info"
              >
                <InfoIcon /> 
              </IconButton>
            )}*/}

            {showEdit && onEdit && (
              <IconButton
                size="small"
                onClick={() => onEdit(data!)}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
                aria-label="Modifica"
              >
                <EditIcon />
              </IconButton>
            )}

            {showDownload && onDownload && (
              <IconButton
                size="small"
                onClick={() => onDownload(data!)}
                sx={{
                  backgroundColor: "success.main",
                  color: "white",
                  "&:hover": { backgroundColor: "success.dark" },
                }}
                aria-label="Download"
              >
                <DownloadIcon />
              </IconButton>
            )}

            {showUpload && onUpload && (
              <IconButton
                size="small"
                onClick={() => onUpload(data!)}
                sx={{
                  backgroundColor: "success.main",
                  color: "white",
                  "&:hover": { backgroundColor: "success.dark" },
                }}
                aria-label="Upload"
              >
                <UploadFileIcon />
              </IconButton>
            )}

            {showDelete && (
              <IconButton
                size="small"
                onClick={() => handleDelete(data!)}
                sx={{
                  backgroundColor: "error.main",
                  color: "white",
                  "&:hover": { backgroundColor: "error.dark" },
                }}
                aria-label="Elimina"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ),
      });
    }

    return baseColumns;
  }, [
    onEdit,
    onInfo,
    onDelete,
    onDownload,
    onUpload,
    additionalColumns,
    showActions,
    showInfo,
    showEdit,
    showDelete,
    showDownload,
    showUpload,
    deleteConfirmMessage,
  ]);
}
